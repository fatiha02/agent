'use client';

import React from 'react';
import { IndianRupee, Clock, User, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const PaymentTable = ({ enrollments }) => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Transaction</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment._id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                        {enrollment.paymentId ? enrollment.paymentId.substring(0, 12) + '...' : 'FREE'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-semibold text-gray-900">{enrollment.studentId?.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-600 truncate max-w-[200px]">{enrollment.courseId?.title}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-gray-900">
                                        {enrollment.paymentStatus === 'FREE' ? 'Free' : `₹${enrollment.courseId?.price || 0}`}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-gray-500 font-medium">
                                    {format(new Date(enrollment.enrolledAt), 'MMM dd, yyyy HH:mm')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;
