'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function HeroSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push(`/courses`);
        }
    };

    return (
        <div className="w-full max-w-2xl relative group px-2">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <form onSubmit={handleSearch} className="relative flex items-center bg-white border border-gray-100 rounded-2xl p-2 shadow-xl shadow-blue-50">
                <Search className="ml-4 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for courses, skills, or instructors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 font-medium py-3 px-4 outline-none"
                />
                <button type="submit" className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
