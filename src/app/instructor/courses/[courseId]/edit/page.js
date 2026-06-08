'use client';

import React, { useState, useEffect } from 'react';
import CourseForm from '@/components/courses/CourseForm';
import { updateCourseAction } from '@/server-actions/course.actions';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditCoursePage({ params: paramsPromise }) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [course, setCourse] = useState(null);
    const router = useRouter();
    const params = React.use(paramsPromise);
    const courseId = params.courseId;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`/api/courses/${courseId}`);
                const data = await response.json();
                if (data.success) {
                    setCourse(data.course);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to load course.');
            } finally {
                setFetching(false);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleUpdate = async (data) => {
        setLoading(true);
        setError('');

        const result = await updateCourseAction(courseId, data);

        if (result.success) {
            router.push('/instructor/dashboard');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-center text-gray-500">Loading course...</div>;
    if (error && !course) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <Link href="/instructor/dashboard" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
                <p className="text-gray-600">Update your course details and settings.</p>
            </div>

            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
                    {error}
                </div>
            )}

            <CourseForm onSubmit={handleUpdate} initialData={course} loading={loading} />
        </div>
    );
}
