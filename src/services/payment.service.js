import { stripe } from '@/lib/stripe';
import Course from '@/models/Course';
import Enrollment from '@/models/Enrollment';
import User from '@/models/User';
import dbConnect from '@/lib/mongoose';

export async function createCheckoutSession(courseId, userId) {
    await dbConnect();

    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId: userId, courseId: course._id });
    if (existingEnrollment && (existingEnrollment.paymentStatus === 'COMPLETED' || existingEnrollment.paymentStatus === 'FREE')) {
        throw new Error('Already enrolled in this course');
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: course.title,
                        description: course.description,
                        images: course.thumbnail ? [course.thumbnail] : [],
                    },
                    unit_amount: Math.round(course.price * 100), // in cents/paise
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/student/my-courses?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/courses/${courseId}?canceled=true`,
        client_reference_id: userId,
        metadata: {
            courseId: course._id.toString(),
            studentId: userId.toString(),
        },
        customer_email: user.email,
    });

    return session;
}

export async function handleWebhookEvent(payload, sig) {
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { courseId, studentId } = session.metadata;

        await dbConnect();

        // Update or create enrollment
        await Enrollment.findOneAndUpdate(
            { studentId, courseId },
            {
                paymentStatus: 'COMPLETED',
                paymentId: session.payment_intent,
                enrolledAt: new Date(),
            },
            { upsert: true, new: true }
        );
    }

    return { received: true };
}
