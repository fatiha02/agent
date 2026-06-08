'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createEnrollment, isEnrolled } from '@/services/enrollment.service';
import { getCourseById } from '@/services/course.service';
import { revalidatePath } from 'next/cache';

export async function enrollInCourseAction(courseId) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error('Please log in to enroll in this course.');
        }

        const course = await getCourseById(courseId);
        if (!course) {
            throw new Error('Course not found.');
        }

        // Check if user is an instructor/admin
        if (session.user.role === 'INSTRUCTOR' || session.user.role === 'ADMIN') {
            // Instructors can't enroll in courses (they teach) for MVP, but we can allow it if needed.
            // For now, let's allow it but maybe with a warning. 
            // Actually, per PRD, roles are separate.
        }

        const enrollmentData = course.isFree
            ? { paymentStatus: 'FREE' }
            : { paymentStatus: 'PENDING' }; // Paid courses will be PENDING until Phase 5

        const enrollment = await createEnrollment(session.user.id, courseId, enrollmentData);

        revalidatePath(`/courses/${courseId}`);
        revalidatePath('/student/dashboard');

        return { success: true, enrollmentId: enrollment._id.toString() };
    } catch (error) {
        console.error('Enroll Action Error:', error);
        return { success: false, error: error.message || 'Failed to enroll.' };
    }
}
