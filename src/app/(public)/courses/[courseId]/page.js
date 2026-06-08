import React from 'react';
import { getCourseById } from '@/services/course.service';
import { getLessonsByCourseId } from '@/services/lesson.service';
import { isEnrolled } from '@/services/enrollment.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import EnrollmentButton from './EnrollmentButton';
import { BookOpen, User, Clock, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export default async function CourseDetailsPage({ params: paramsPromise }) {
    const session = await getServerSession(authOptions);
    const params = await paramsPromise;
    const { courseId } = params;

    const course = await getCourseById(courseId);
    if (!course) return <div className="p-20 text-center">Course not found.</div>;

    const lessons = await getLessonsByCourseId(courseId);
    const enrolled = session ? await isEnrolled(session.user.id, courseId) : false;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                            {course.category}
                        </span>
                        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            <span>Instructor: <span className="text-gray-900 font-semibold">{course.instructorId.name}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <span>{lessons.length} Lessons</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">Curriculum</h2>
                        <div className="space-y-3">
                            {lessons.map((lesson, index) => (
                                <div key={lesson._id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-100 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 rounded-lg text-sm font-bold transition-colors">
                                            {index + 1}
                                        </div>
                                        <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                                    </div>
                                    {!enrolled && (
                                        <Lock className="w-4 h-4 text-gray-300" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    No Preview
                                </div>
                            )}
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-gray-900">
                                    {course.isFree ? 'Free' : `₹${course.price}`}
                                </span>
                            </div>

                            <EnrollmentButton
                                courseId={course._id.toString()}
                                isEnrolled={enrolled}
                                isFree={course.isFree}
                                isLoggedIn={!!session}
                            />

                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <h5 className="text-sm font-bold text-gray-900">This course includes:</h5>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Full lifetime access
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Access on mobile and TV
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        Certificate of completion
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
