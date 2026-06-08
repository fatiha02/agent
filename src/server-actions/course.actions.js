'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createCourse, updateCourse, deleteCourse } from '@/services/course.service';
import { courseSchema, updateCourseSchema } from '@/validators/course.validator';
import { revalidatePath } from 'next/cache';

async function getInstructorSession() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'INSTRUCTOR' && session.user.role !== 'ADMIN')) {
        throw new Error('Unauthorized. Only instructors can perform this action.');
    }
    return session;
}

export async function createCourseAction(formData) {
    try {
        const session = await getInstructorSession();
        const validatedData = courseSchema.parse(formData);
        const course = await createCourse(validatedData, session.user.id);

        revalidatePath('/instructor/courses');
        return { success: true, courseId: course._id.toString() };
    } catch (error) {
        console.error('Create Course Error:', error);
        return { success: false, error: error.message || 'Failed to create course.' };
    }
}

export async function updateCourseAction(courseId, formData) {
    try {
        const session = await getInstructorSession();
        const validatedData = updateCourseSchema.parse(formData);
        const course = await updateCourse(courseId, validatedData, session.user.id);

        revalidatePath('/instructor/courses');
        revalidatePath(`/instructor/courses/${courseId}/edit`);
        return { success: true, course };
    } catch (error) {
        console.error('Update Course Error:', error);
        return { success: false, error: error.message || 'Failed to update course.' };
    }
}

export async function deleteCourseAction(courseId) {
    try {
        const session = await getInstructorSession();
        await deleteCourse(courseId, session.user.id);

        revalidatePath('/instructor/courses');
        return { success: true };
    } catch (error) {
        console.error('Delete Course Error:', error);
        return { success: false, error: error.message || 'Failed to delete course.' };
    }
}
export async function submitCourseForReviewAction(courseId) {
    try {
        const session = await getInstructorSession();
        const course = await updateCourse(courseId, { status: COURSE_STATUS.PENDING }, session.user.id);

        revalidatePath('/instructor/courses');
        revalidatePath('/instructor/dashboard');
        return { success: true, course };
    } catch (error) {
        console.error('Submit Course Error:', error);
        return { success: false, error: error.message || 'Failed to submit course.' };
    }
}
