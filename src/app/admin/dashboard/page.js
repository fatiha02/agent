import React from 'react';
import { getAdminStatsAction } from '@/server-actions/admin.actions';
import { Users, BookOpen, CreditCard, TrendingUp, AlertCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function AdminDashboardPage() {
    const { success, stats, error } = await getAdminStatsAction();

    if (!success) {
        return <div className="p-20 text-center text-red-500 font-bold">Error loading stats: {error}</div>;
    }

    const cards = [
        { title: 'Total Users', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/admin/users' },
        { title: 'Total Courses', value: stats.courseCount, icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50', link: '/admin/courses' },
        { title: 'Enrollments', value: stats.enrollmentCount, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', link: '/admin/payments' },
        { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50', link: '/admin/payments' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-gray-900">Platform Analytics</h1>
                    <p className="text-gray-500 font-medium">Overview of your marketplace performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <LogoutButton className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <Link key={i} href={card.link} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
                            <p className="text-3xl font-black text-gray-900 mt-1">{card.value}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/admin/courses" className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 transition-all group">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Review Courses</p>
                                <p className="text-xs text-gray-500">Approve or reject new content</p>
                            </div>
                        </Link>
                        <Link href="/admin/users" className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 transition-all group">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Manage Users</p>
                                <p className="text-xs text-gray-500">Suspend or activate accounts</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
                    <h3 className="text-xl font-bold">Admin Notice</h3>
                    <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                        As an administrator, you have the authority to manage the entire platform. Please ensure all actions comply with the marketplace guidelines.
                    </p>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Platform Status</p>
                                <p className="font-bold">Healthy & Secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
