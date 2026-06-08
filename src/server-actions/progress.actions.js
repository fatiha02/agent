'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import * as progressService from '@/services/progress.service';
import { revalidatePath } from 'next/cache';

export async function updateLessonProgressAction(courseId, lessonId, data) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error('Unauthorized');
        }

        const studentId = session.user.id;
        const progress = await progressService.updateProgress(studentId, courseId, lessonId, data);

        revalidatePath(`/student/learn/${courseId}`);
        revalidatePath(`/student/dashboard`);

        return { success: true, progress: JSON.parse(JSON.stringify(progress)) };
    } catch (error) {
        console.error('Update Progress Action Error:', error);
        return { success: false, error: error.message };
    }
}

export async function getCourseProgressAction(courseId) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error('Unauthorized');
        }

        const studentId = session.user.id;
        const progressList = await progressService.getCourseProgress(studentId, courseId);

        return { success: true, progress: JSON.parse(JSON.stringify(progressList)) };
    } catch (error) {
        console.error('Get Course Progress Action Error:', error);
        return { success: false, error: error.message };
    }
}
