import Enrollment from '@/models/Enrollment';
import dbConnect from '@/lib/mongoose';

export async function createEnrollment(studentId, courseId, paymentData = {}) {
    await dbConnect();

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
        throw new Error('You are already enrolled in this course.');
    }

    const enrollment = await Enrollment.create({
        studentId,
        courseId,
        ...paymentData,
    });

    return enrollment;
}

export async function isEnrolled(studentId, courseId) {
    await dbConnect();
    const enrollment = await Enrollment.findOne({ studentId, courseId });
    return !!enrollment;
}

export async function getStudentEnrollments(studentId) {
    await dbConnect();
    return Enrollment.find({ studentId }).populate('courseId');
}

export async function getCourseEnrollmentCount(courseId) {
    await dbConnect();
    return Enrollment.countDocuments({ courseId });
}
