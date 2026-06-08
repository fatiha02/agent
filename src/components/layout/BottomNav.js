'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Heart, User } from 'lucide-react';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: BookOpen, label: 'Courses', href: '/courses' },
        { icon: Heart, label: 'Wishlist', href: '/wishlist' },
        { icon: User, label: 'Profile', href: '/profile' },
    ];

    if (pathname.startsWith('/admin')) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around z-50 px-2 pb-safe">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'
                            }`}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? 'fill-blue-50' : ''}`} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default BottomNav;
