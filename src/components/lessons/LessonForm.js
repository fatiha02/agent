'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { lessonSchema } from '@/validators/lesson.validator';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const LessonForm = ({ onSubmit, initialData = {}, loading = false, courseId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            title: initialData.title || '',
            videoUrl: initialData.videoUrl || '',
            order: initialData.order || 0,
            courseId: courseId,
        },
    });

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        if (!initialData._id) {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900">{initialData._id ? 'Edit Lesson' : 'Add New Lesson'}</h3>
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lesson Title</label>
                    <Input
                        {...register('title')}
                        placeholder="e.g. Introduction to the course"
                        error={errors.title?.message}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Video URL (Cloudinary/S3/YouTube)</label>
                    <Input
                        {...register('videoUrl')}
                        placeholder="https://..."
                        error={errors.videoUrl?.message}
                    />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" loading={loading} className="bg-blue-600 text-white px-6">
                        {initialData._id ? 'Update' : 'Add Lesson'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LessonForm;
