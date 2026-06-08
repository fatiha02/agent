'use client';

import React, { useState } from 'react';
import CourseList from '@/components/courses/CourseList';
import { Search } from 'lucide-react';

export default function CoursesClient({ courses }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Filter courses based on search query
    const filteredCourses = courses.filter(course => {
        const searchLower = searchQuery.toLowerCase();
        return (
            course.title?.toLowerCase().includes(searchLower) ||
            course.description?.toLowerCase().includes(searchLower) ||
            course.category?.toLowerCase().includes(searchLower)
        );
    });

    // Sort courses
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a.price || 0) - (b.price || 0);
            case 'price-high':
                return (b.price || 0) - (a.price || 0);
            case 'newest':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold">Explore Courses</h1>
                    <p className="text-blue-100 text-lg">Pick a skill and start your learning journey today.</p>
                </div>
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm transition-all"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {searchQuery ? `Search Results (${sortedCourses.length})` : 'All Courses'}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border-none focus:ring-0 font-semibold text-gray-900 cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <CourseList courses={sortedCourses} />
            </div>
        </div>
    );
}
