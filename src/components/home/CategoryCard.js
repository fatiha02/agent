'use client';

import React from 'react';
import { Code, Palette, TrendingUp, Megaphone } from 'lucide-react';

const icons = {
    Coding: { icon: Code, color: 'text-blue-600', bg: 'bg-blue-50' },
    Design: { icon: Palette, color: 'text-purple-600', bg: 'bg-purple-50' },
    Business: { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    Marketing: { icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
};

const CategoryCard = ({ title = 'Coding' }) => {
    const { icon: Icon, color, bg } = icons[title] || icons.Coding;

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer group w-full aspect-square">
            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform`}>
                <Icon className={`w-7 h-7 ${color}`} />
            </div>
            <span className="font-bold text-gray-900">{title}</span>
        </div>
    );
};

export default CategoryCard;
