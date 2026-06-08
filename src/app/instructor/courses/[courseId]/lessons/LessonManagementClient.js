'use client';

import React, { useState } from 'react';
import LessonForm from '@/components/lessons/LessonForm';
import LessonList from '@/components/lessons/LessonList';
import { createLessonAction, updateLessonAction, deleteLessonAction } from '@/server-actions/lesson.actions';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function LessonManagementClient({ course, lessons }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddLesson = async (data) => {
        setLoading(true);
        const result = await createLessonAction(data);
        if (result.success) {
            setIsFormOpen(false);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleUpdateLesson = async (data) => {
        setLoading(true);
        const result = await updateLessonAction(editingLesson._id, course._id, data);
        if (result.success) {
            setEditingLesson(null);
            setIsFormOpen(false);
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    const handleDeleteLesson = async (lessonId) => {
        if (confirm('Are you sure you want to delete this lesson?')) {
            const result = await deleteLessonAction(lessonId, course._id);
            if (!result.success) {
                alert(result.error);
            }
        }
    };

    const openEditForm = (lesson) => {
        setEditingLesson(lesson);
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Link href="/instructor/dashboard" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Lessons</h1>
                    <p className="text-gray-600">Course: <span className="font-semibold text-blue-600">{course.title}</span></p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => {
                            setEditingLesson(null);
                            setIsFormOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Lesson
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
                    <LessonList
                        lessons={lessons}
                        onEdit={openEditForm}
                        onDelete={handleDeleteLesson}
                    />
                </div>

                <div className="lg:col-span-1">
                    {isFormOpen ? (
                        <div className="sticky top-24">
                            <LessonForm
                                onSubmit={editingLesson ? handleUpdateLesson : handleAddLesson}
                                initialData={editingLesson || {}}
                                loading={loading}
                                courseId={course._id}
                            />
                            <button
                                onClick={() => {
                                    setIsFormOpen(false);
                                    setEditingLesson(null);
                                }}
                                className="w-full mt-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 text-center space-y-2">
                            <p className="text-sm text-gray-500 italic">Select "Add New Lesson" to expand your curriculum.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
