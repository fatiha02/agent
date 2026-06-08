import React from 'react';
import { getPublicCourses } from '@/services/course.service';
import CoursesClient from '@/components/courses/CoursesClient';

export const metadata = {
    title: 'Courses | AlfaLearning',
    description: 'Browse our extensive catalog of professional courses.',
};

export default async function CoursesPage() {
    const courses = await getPublicCourses();

    // Serialize courses for client component
    const serializedCourses = courses.map(course => ({
        ...course,
        _id: course._id.toString(),
        instructorId: course.instructorId?.toString() || null,
        createdAt: course.createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: course.updatedAt?.toISOString() || new Date().toISOString(),
    }));

    return <CoursesClient courses={serializedCourses} />;
}
