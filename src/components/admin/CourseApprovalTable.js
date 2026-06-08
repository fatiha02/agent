'use client';

import React from 'react';
import { BookOpen, Check, X, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const CourseApprovalTable = ({ courses, onApprove, onReject }) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {courses.map((course) => (
                            <tr key={course._id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 aspect-video rounded-lg bg-gray-100 overflow-hidden">
                                            {course.thumbnail ? (
                                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <BookOpen className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="font-bold text-gray-900 max-w-xs truncate">{course.title}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {course.instructorId?.name || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                    {course.isFree ? 'Free' : `₹${course.price}`}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-600' :
                                            course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {course.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {course.status === 'PENDING' && (
                                            <>
                                                <Button
                                                    onClick={() => onApprove(course._id)}
                                                    className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        const reason = prompt('Enter rejection reason:');
                                                        if (reason !== null) onReject(course._id, reason);
                                                    }}
                                                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </>
                                        )}
                                        {course.rejectionReason && (
                                            <div className="group relative">
                                                <AlertCircle className="w-4 h-4 text-gray-400" />
                                                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    Rejected: {course.rejectionReason}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseApprovalTable;
