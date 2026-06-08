'use client';

import React from 'react';
import { GripVertical, Edit2, Trash2, PlayCircle } from 'lucide-react';

const LessonList = ({ lessons, onEdit, onDelete, onReorder }) => {
    if (lessons.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 text-sm">No lessons added yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {lessons.map((lesson, index) => (
                <div
                    key={lesson._id}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                    <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
                        <GripVertical className="w-5 h-5 cursor-move" />
                    </div>

                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                    </div>

                    <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{lesson.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <PlayCircle className="w-3 h-3" />
                            <span className="truncate">{lesson.videoUrl}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEdit(lesson)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(lesson._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
