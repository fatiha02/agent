'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createLesson, updateLesson, deleteLesson, reorderLessons } from '@/services/lesson.service';
import { getCourseById } from '@/services/course.service';
import { lessonSchema, updateLessonSchema } from '@/validators/lesson.validator';
import { revalidatePath } from 'next/cache';

async function verifyCourseOwnership(courseId) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'INSTRUCTOR' && session.user.role !== 'ADMIN')) {
        throw new Error('Unauthorized.');
    }

    const course = await getCourseById(courseId);
    if (!course) {
        throw new Error('Course not found.');
    }

    if (course.instructorId._id.toString() !== session.user.id && session.user.role !== 'ADMIN') {
        throw new Error('You do not have permission to manage lessons for this course.');
    }

    return session;
}

export async function createLessonAction(formData) {
    try {
        await verifyCourseOwnership(formData.courseId);
        const validatedData = lessonSchema.parse(formData);
        const lesson = await createLesson(validatedData);

        revalidatePath(`/instructor/courses/${formData.courseId}/lessons`);
        return { success: true, lessonId: lesson._id.toString() };
    } catch (error) {
        console.error('Create Lesson Error:', error);
        return { success: false, error: error.message || 'Failed to create lesson.' };
    }
}

export async function updateLessonAction(lessonId, courseId, formData) {
    try {
        await verifyCourseOwnership(courseId);
        const validatedData = updateLessonSchema.parse(formData);
        const lesson = await updateLesson(lessonId, validatedData);

        revalidatePath(`/instructor/courses/${courseId}/lessons`);
        return { success: true, lesson };
    } catch (error) {
        console.error('Update Lesson Error:', error);
        return { success: false, error: error.message || 'Failed to update lesson.' };
    }
}

export async function deleteLessonAction(lessonId, courseId) {
    try {
        await verifyCourseOwnership(courseId);
        await deleteLesson(lessonId);

        revalidatePath(`/instructor/courses/${courseId}/lessons`);
        return { success: true };
    } catch (error) {
        console.error('Delete Lesson Error:', error);
        return { success: false, error: error.message || 'Failed to delete lesson.' };
    }
}

export async function reorderLessonsAction(courseId, lessonIds) {
    try {
        await verifyCourseOwnership(courseId);
        await reorderLessons(lessonIds);

        revalidatePath(`/instructor/courses/${courseId}/lessons`);
        return { success: true };
    } catch (error) {
        console.error('Reorder Lessons Error:', error);
        return { success: false, error: error.message || 'Failed to reorder lessons.' };
    }
}
