'use client';

import React from 'react';
import { Play } from 'lucide-react';

const ContinueLearning = () => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200"
                    alt="Course"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">Data Science Bootcamp</h4>
                <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-[65%]" />
                </div>
                <p className="mt-1 text-[10px] text-gray-500 font-medium">
                    65% complete • 12 lectures left
                </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm shadow-blue-100">
                <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
        </div>
    );
};

export default ContinueLearning;
