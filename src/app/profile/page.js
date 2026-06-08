'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { User, Mail, BookOpen, Award, Globe, Camera } from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';

const ProfilePage = () => {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('profile');

    if (!session) {
        return <div className="p-20 text-center">Please log in to view your profile.</div>;
    }

    const isInstructor = session.user.role === 'INSTRUCTOR';
    const isAdmin = session.user.role === 'ADMIN';

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'photo', label: 'Photo' },
        { id: 'account', label: 'Account Security' },
    ];

    const initials = session.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 bg-gray-50 p-6 border-r border-gray-100">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
                                {initials}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{session.user.name}</h2>
                            <p className="text-sm text-gray-500 capitalize mt-1">{session.user.role.toLowerCase()}</p>
                        </div>

                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <LogoutButton className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 justify-center" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Public Profile</h1>
                                    <p className="text-gray-500 text-sm">Add information about yourself</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue={session.user.name.split(' ')[0]}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue={session.user.name.split(' ')[1] || ''}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {isInstructor && (
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
                                            <input
                                                type="text"
                                                placeholder='Instructor at AlfaLearning'
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Add a professional headline like "Instructor at AlfaLearning" or "Expert Developer"
                                            </p>
                                        </div>
                                    )}

                                    {isInstructor && (
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Biography</label>
                                            <textarea
                                                rows={6}
                                                placeholder="Tell students about yourself and your teaching experience..."
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-none"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500">
                                            <option>English (US)</option>
                                            <option>Hindi</option>
                                            <option>Spanish</option>
                                        </select>
                                    </div>

                                    {isInstructor && (
                                        <>
                                            <div className="pt-6 border-t border-gray-100">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Links</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://yourwebsite.com"
                                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-2">Twitter</label>
                                                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                                                <span className="px-3 py-3 bg-gray-50 text-gray-500 text-sm">twitter.com/</span>
                                                                <input
                                                                    type="text"
                                                                    placeholder="username"
                                                                    className="flex-1 px-3 py-3 focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn</label>
                                                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                                                <span className="px-3 py-3 bg-gray-50 text-gray-500 text-sm">linkedin.com/in/</span>
                                                                <input
                                                                    type="text"
                                                                    placeholder="username"
                                                                    className="flex-1 px-3 py-3 focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="pt-6">
                                        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'photo' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Photo</h1>
                                    <p className="text-gray-500 text-sm">Upload a professional photo</p>
                                </div>

                                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-6">
                                        {initials}
                                    </div>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                                        <Camera className="w-5 h-5" />
                                        Upload Photo
                                    </button>
                                    <p className="text-xs text-gray-500 mt-4">JPG or PNG. Max size 2MB</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Security</h1>
                                    <p className="text-gray-500 text-sm">Manage your account settings</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue={session.user.email}
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                                        />
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
