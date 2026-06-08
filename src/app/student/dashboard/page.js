import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStudentEnrollments } from '@/services/enrollment.service';
import CourseCard from '@/components/courses/CourseCard';
import { BookOpen, Award, TrendingUp, Search } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions);
    const enrollments = await getStudentEnrollments(session.user.id);
    const enrolledCourses = enrollments.map(e => e.courseId);

    const stats = [
        { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Completed', value: '0', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Learning Hours', value: '0', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                    <p className="text-gray-600">Keep going, {session.user.name}!</p>
                </div>
                <div className="flex items-center gap-3">
                    <LogoutButton className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100" />
                    {enrolledCourses.length > 0 && (
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 bg-white rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                            <Search className="w-5 h-5" />
                            Explore More
                        </Link>
                    )}
                </div>
            </div>

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
                    <h2 className="text-xl font-bold text-gray-900">Your Courses</h2>
                </div>

                {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {enrolledCourses.map((course) => (
                            <div key={course._id} className="relative group">
                                <CourseCard course={JSON.parse(JSON.stringify(course))} />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/5 flex items-center justify-center transition-opacity pointer-events-none rounded-xl">
                                    <Link
                                        href={`/student/learn/${course._id}`}
                                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold shadow-xl pointer-events-auto"
                                    >
                                        Go to Lesson
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
                        >
                            Browse Our Courses
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
