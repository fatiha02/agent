'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, BookOpen } from 'lucide-react';
import CourseCard from './CourseCard';
import { deleteCourseAction } from '@/server-actions/course.actions';

const CourseList = ({ courses, isInstructor = false, onSubmitReview }) => {
    const handleDelete = async (courseId) => {
        if (confirm('Are you sure you want to delete this course?')) {
            const result = await deleteCourseAction(courseId);
            if (!result.success) {
                alert(result.error);
            }
        }
    };

    const handleSubmitReview = async (courseId) => {
        if (confirm('Submit this course for admin review?')) {
            const result = await onSubmitReview(courseId);
            if (result.success) {
                alert('Course submitted successfully!');
            } else {
                alert(result.error);
            }
        }
    };

    if (courses.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <BookOpen className="w-8 h-8 text-gray-300" />
                </div>
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-gray-900">No courses found</p>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        {isInstructor
                            ? "You haven't created any courses yet. Start your teaching journey today!"
                            : "No public courses are available at the moment."}
                    </p>
                </div>
                {isInstructor && (
                    <Link
                        href="/instructor/courses/new"
                        className="mt-2 inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Create Your First Course
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.filter(c => c && typeof c === 'object').map((course) => (
                <CourseCard
                    key={course._id || Math.random().toString()}
                    course={JSON.parse(JSON.stringify(course))}
                    onDelete={handleDelete}
                    onReview={handleSubmitReview}
                    isInstructor={isInstructor}
                />
            ))}
        </div>
    );
};

export default CourseList;
