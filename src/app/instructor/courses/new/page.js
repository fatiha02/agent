'use client';

import React, { useState } from 'react';
import CourseForm from '@/components/courses/CourseForm';
import { createCourseAction } from '@/server-actions/course.actions';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCoursePage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleCreate = async (data) => {
        setLoading(true);
        setError('');

        const result = await createCourseAction(data);

        if (result.success) {
            router.push('/instructor/dashboard');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <Link href="/instructor/dashboard" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-600">Fill in the details below to launch your course.</p>
            </div>

            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
                    {error}
                </div>
            )}

            <CourseForm onSubmit={handleCreate} loading={loading} />
        </div>
    );
}
