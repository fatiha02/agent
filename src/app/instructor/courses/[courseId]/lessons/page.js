import React from 'react';
import { getLessonsByCourseId } from '@/services/lesson.service';
import { getCourseById } from '@/services/course.service';
import LessonManagementClient from './LessonManagementClient';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function LessonManagementPage({ params: paramsPromise }) {
    const session = await getServerSession(authOptions);
    const params = await paramsPromise;
    const { courseId } = params;

    const course = await getCourseById(courseId);
    if (!course) redirect('/instructor/dashboard');

    // Verify ownership
    if (course.instructorId._id.toString() !== session.user.id && session.user.role !== 'ADMIN') {
        redirect('/instructor/dashboard');
    }

    const lessons = await getLessonsByCourseId(courseId);

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <LessonManagementClient
                course={JSON.parse(JSON.stringify(course))}
                lessons={JSON.parse(JSON.stringify(lessons))}
            />
        </div>
    );
}
