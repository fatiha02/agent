'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, LayoutDashboard, Users, BookOpenCheck, Banknote } from 'lucide-react';

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const isAdminPath = pathname.startsWith('/admin');

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                        A
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        AlfaLearning
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-6">
                    {!isAdminPath ? (
                        <>
                            <Link href="/courses" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                Explore Courses
                            </Link>
                            {session?.user?.role === 'STUDENT' && (
                                <Link href="/student/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                    My Learning
                                </Link>
                            )}
                            {session?.user?.role === 'INSTRUCTOR' && (
                                <Link href="/instructor/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                    Instructor Dashboard
                                </Link>
                            )}
                            {session?.user?.role === 'ADMIN' && (
                                <Link href="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                    Admin Dashboard
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/admin/dashboard" className={`flex items-center gap-2 text-sm font-bold ${pathname === '/admin/dashboard' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link href="/admin/users" className={`flex items-center gap-2 text-sm font-bold ${pathname === '/admin/users' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                                <Users className="w-4 h-4" />
                                Users
                            </Link>
                            <Link href="/admin/courses" className={`flex items-center gap-2 text-sm font-bold ${pathname === '/admin/courses' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                                <BookOpenCheck className="w-4 h-4" />
                                Approvals
                            </Link>
                            <Link href="/admin/payments" className={`flex items-center gap-2 text-sm font-bold ${pathname === '/admin/payments' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                                <Banknote className="w-4 h-4" />
                                Payments
                            </Link>
                        </>
                    )}
                </div>


                {!isAdminPath && (
                    <div className="hidden md:flex relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search for courses, skills..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {session ? (
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{session.user.role.toLowerCase()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/profile" className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 overflow-hidden hover:bg-blue-100 transition-colors">
                                <User className="w-6 h-6" />
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                            Log In
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
