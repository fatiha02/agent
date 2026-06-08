import React from 'react';
import { getAllCoursesAdminAction, approveCourseAction, rejectCourseAction } from '@/server-actions/admin.actions';
import CourseApprovalTable from '@/components/admin/CourseApprovalTable';
import { BookOpenCheck } from 'lucide-react';

export default async function AdminCoursesPage() {
    const { success, courses, error } = await getAllCoursesAdminAction();

    if (!success) {
        return <div className="p-20 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-gray-900">Course Approvals</h1>
                    <p className="text-sm text-gray-500 font-medium">Review and publish pending courses.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100">
                    <BookOpenCheck className="w-4 h-4" />
                    <span>Quality Control</span>
                </div>
            </div>

            <CourseApprovalTable
                courses={courses}
                onApprove={async (id) => {
                    'use server';
                    await approveCourseAction(id);
                }}
                onReject={async (id, reason) => {
                    'use server';
                    await rejectCourseAction(id, reason);
                }}
            />
        </div>
    );
}
