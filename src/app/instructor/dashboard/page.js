import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInstructorCourses as fetchCourses } from '@/services/course.service';
import CourseList from '@/components/courses/CourseList';
import { submitCourseForReviewAction } from '@/server-actions/course.actions';
import { PlusCircle, BookOpen, Users, TrendingUp } from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function InstructorDashboard() {
    const session = await getServerSession(authOptions);
    const courses = await fetchCourses(session.user.id);

    const stats = [
        { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Students', value: '0', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Course Ratings', value: '0.0', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {session.user.name}!</p>
                </div>
                <div className="flex items-center gap-3">
                    <LogoutButton className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100" />
                    <Link
                        href="/instructor/courses/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create New Course
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Your Recent Courses</h2>
                            <Link href="/instructor/courses" className="text-sm font-medium text-blue-600 hover:underline">
                                View All
                            </Link>
                        </div>
                        <CourseList
                            courses={courses}
                            isInstructor={true}
                            onSubmitReview={submitCourseForReviewAction}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl shadow-blue-100 space-y-4">
                        <h3 className="font-bold text-lg">Ready to teach?</h3>
                        <p className="text-blue-100 text-sm">Create a new course and share your knowledge with students around the globe.</p>
                        <Link
                            href="/instructor/courses/new"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Launch New Course
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-900">Quick Links</h3>
                        <div className="space-y-2">
                            <Link href="/courses" className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors py-2 border-b border-gray-50 last:border-0">
                                <BookOpen className="w-4 h-4" />
                                Browse Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
