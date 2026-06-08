'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '@/validators/course.validator';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { COURSE_STATUS } from '@/utils/constants';

const CourseForm = ({ onSubmit, initialData = {}, loading = false }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: initialData.title || '',
            description: initialData.description || '',
            category: initialData.category || '',
            thumbnail: initialData.thumbnail || '',
            price: initialData.price || 0,
            isFree: initialData.isFree || false,
            status: initialData.status || COURSE_STATUS.DRAFT,
        },
    });

    const isFree = watch('isFree');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Course Title</label>
                    <Input
                        {...register('title')}
                        placeholder="e.g. Master Next.js for Beginners"
                        error={errors.title?.message}
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        {...register('description')}
                        placeholder="Describe what students will learn..."
                        rows={4}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Category</label>
                    <select
                        {...register('category')}
                        className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                    </select>
                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Thumbnail URL</label>
                    <Input
                        {...register('thumbnail')}
                        placeholder="https://example.com/image.jpg"
                        error={errors.thumbnail?.message}
                    />
                </div>

                <div className="flex items-center gap-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('isFree')}
                            id="isFree"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isFree" className="text-sm font-semibold text-gray-700">Free Course</label>
                    </div>
                </div>

                {!isFree && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Price (INR)</label>
                        <Input
                            type="number"
                            {...register('price', { valueAsNumber: true })}
                            placeholder="0"
                            error={errors.price?.message}
                        />
                    </div>
                )}
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-wrap gap-4">
                <Button type="submit" loading={loading} className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
                    {initialData._id ? 'Update Course' : 'Create Course'}
                </Button>
                {initialData.status === COURSE_STATUS.DRAFT && (
                    <Button
                        type="button"
                        onClick={() => {
                            setValue('status', COURSE_STATUS.PENDING);
                            handleSubmit(onSubmit)();
                        }}
                        loading={loading}
                        className="px-8 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                        Save & Submit for Review
                    </Button>
                )}
            </div>
        </form>
    );
};

export default CourseForm;
