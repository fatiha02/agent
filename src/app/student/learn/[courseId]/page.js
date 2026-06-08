import React from 'react';
import { getCourseById } from '@/services/course.service';
import { getLessonsByCourseId } from '@/services/lesson.service';
import { isEnrolled } from '@/services/enrollment.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LearningPlayerClient from './LearningPlayerClient';

export default async function LearnPage({ params: paramsPromise }) {
    const session = await getServerSession(authOptions);
    const params = await paramsPromise;
    const { courseId } = params;

    // Security check
    const enrolled = session ? await isEnrolled(session.user.id, courseId) : false;
    if (!enrolled) {
        redirect(`/courses/${courseId}`);
    }

    const course = await getCourseById(courseId);
    const lessons = await getLessonsByCourseId(courseId);

    if (lessons.length === 0) {
        return <div className="p-20 text-center">This course has no lessons yet.</div>;
    }

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden">
            <LearningPlayerClient
                course={JSON.parse(JSON.stringify(course))}
                lessons={JSON.parse(JSON.stringify(lessons))}
            />
        </div>
    );
}
