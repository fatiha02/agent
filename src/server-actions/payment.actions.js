'use server';

import { createCheckoutSession } from '@/services/payment.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function initiateCheckout(courseId) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error('You must be logged in to enroll.');
        }

        const stripeSession = await createCheckoutSession(courseId, session.user.id);
        return { url: stripeSession.url };
    } catch (error) {
        console.error('Checkout error:', error);
        return { error: error.message || 'Failed to initiate checkout.' };
    }
}
