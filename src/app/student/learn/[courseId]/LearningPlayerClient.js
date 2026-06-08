'use client';

import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '@/components/lessons/VideoPlayer';
import { ChevronLeft, PlayCircle, CheckCircle2, Menu } from 'lucide-react';
import Link from 'next/link';
import { updateLessonProgressAction, getCourseProgressAction } from '@/server-actions/progress.actions';

const LearningPlayerClient = ({ course, lessons }) => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [lessonProgress, setLessonProgress] = useState({});
    const [loadingProgress, setLoadingProgress] = useState(true);
    const playerRef = useRef(null);
    const lastSavedTime = useRef(0);

    const currentLesson = lessons[currentLessonIndex];

    useEffect(() => {
        const fetchProgress = async () => {
            const result = await getCourseProgressAction(course._id);
            if (result.success) {
                const progressMap = {};
                result.progress.forEach(p => {
                    progressMap[p.lessonId] = p;
                });
                setLessonProgress(progressMap);
            }
            setLoadingProgress(false);
        };
        fetchProgress();
    }, [course._id]);

    const handleNext = async () => {
        // Auto mark as complete when done
        if (!lessonProgress[currentLesson._id]?.completed) {
            await handleUpdateProgress(true);
        }

        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        }
    };

    const handleUpdateProgress = async (completed = false, currentTime = null) => {
        const data = {};
        if (completed) data.completed = true;
        if (currentTime !== null) data.lastWatchedTime = currentTime;

        if (Object.keys(data).length === 0) return;

        const result = await updateLessonProgressAction(course._id, currentLesson._id, data);
        if (result.success) {
            setLessonProgress(prev => ({
                ...prev,
                [currentLesson._id]: result.progress
            }));
        }
    };

    const onVideoProgress = (state) => {
        const currentTime = Math.floor(state.playedSeconds);
        // Save every 10 seconds
        if (currentTime - lastSavedTime.current >= 10) {
            handleUpdateProgress(false, currentTime);
            lastSavedTime.current = currentTime;
        }
    };

    const onVideoPlay = () => {
        const savedTime = lessonProgress[currentLesson._id]?.lastWatchedTime || 0;
        if (savedTime > 0 && playerRef.current && lastSavedTime.current === 0) {
            playerRef.current.seekTo(savedTime, 'seconds');
            lastSavedTime.current = savedTime;
        }
    };

    const completedCount = Object.values(lessonProgress).filter(p => p.completed).length;
    const progressPercentage = Math.round((completedCount / lessons.length) * 100);

    return (
        <div className="flex h-full bg-gray-900 border-t border-white/5">
            {/* Main Player Area */}
            <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarOpen ? 'mr-0' : 'mr-0'}`}>
                <div className="flex-grow p-4 md:p-8 flex flex-col justify-center max-w-6xl mx-auto w-full">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/student/dashboard"
                                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-white truncate max-w-md">
                                    {currentLesson.title}
                                </h1>
                                <p className="text-sm text-white/40">{course.title}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg lg:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    <VideoPlayer
                        playerRef={playerRef}
                        url={currentLesson.videoUrl}
                        onEnded={handleNext}
                        onProgress={onVideoProgress}
                        onPlay={onVideoPlay}
                    />

                    <div className="mt-8 flex items-center justify-between">
                        <button
                            disabled={currentLessonIndex === 0}
                            onClick={() => {
                                setCurrentLessonIndex(prev => prev - 1);
                                lastSavedTime.current = 0;
                            }}
                            className="px-6 py-2 rounded-xl text-white font-semibold disabled:opacity-20 hover:bg-white/5 transition-all"
                        >
                            Previous
                        </button>
                        <div className="text-white/40 text-sm font-medium">
                            Lesson {currentLessonIndex + 1} of {lessons.length}
                        </div>
                        <button
                            disabled={currentLessonIndex === lessons.length - 1}
                            onClick={() => {
                                handleNext();
                                lastSavedTime.current = 0;
                            }}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-900/40 disabled:opacity-20 transition-all"
                        >
                            Next Lesson
                        </button>
                    </div>
                </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className={`
                fixed inset-y-16 right-0 z-40 w-80 bg-gray-900 border-l border-white/10 transition-transform duration-300 transform lg:relative lg:inset-y-0 lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:hidden'}
            `}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="text-lg font-bold text-white">Course Curriculum</h3>
                        <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs text-white/40 font-medium">
                            {progressPercentage}% Complete
                        </p>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {lessons.map((lesson, index) => {
                            const isCompleted = lessonProgress[lesson._id]?.completed;
                            const isActive = currentLessonIndex === index;

                            return (
                                <button
                                    key={lesson._id}
                                    onClick={() => {
                                        setCurrentLessonIndex(index);
                                        lastSavedTime.current = 0;
                                    }}
                                    className={`
                                        w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group
                                        ${isActive
                                            ? 'bg-blue-600/10 border border-blue-500/20 text-blue-400'
                                            : 'hover:bg-white/5 text-white/60'}
                                    `}
                                >
                                    <div className={`
                                        flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs
                                        ${isActive ? 'bg-blue-600 text-white' : 'bg-white/5 group-hover:bg-white/10'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className={`text-sm font-semibold truncate ${isActive ? 'text-white' : ''}`}>
                                            {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <PlayCircle className="w-3 h-3 opacity-40" />
                                            <span className="text-[10px] opacity-40 font-bold uppercase tracking-wider">Video</span>
                                        </div>
                                    </div>
                                    {isCompleted && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPlayerClient;
