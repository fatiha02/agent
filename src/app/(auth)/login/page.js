import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

export const metadata = {
    title: 'Login | AlfaLearning',
    description: 'Login to your AlfaLearning account.',
};

export default function LoginPage() {
    return (
        <main className="flex min-h-screen">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 mb-16">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-2xl shadow-xl">
                            A
                        </div>
                        <span className="text-2xl font-bold">AlfaLearning</span>
                    </Link>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-5xl font-black leading-tight mb-6">
                                Welcome back
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Continue your learning journey and access thousands of courses from world-class instructors.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">5k+</div>
                                <div className="text-sm text-blue-200">Courses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">10k+</div>
                                <div className="text-sm text-blue-200">Students</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black mb-2">1.2k+</div>
                                <div className="text-sm text-blue-200">Instructors</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3 text-blue-100">
                        <Award className="w-5 h-5" />
                        <span className="text-sm">Access 5,000+ courses</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                        <Users className="w-5 h-5" />
                        <span className="text-sm">Learn from expert instructors</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm">Advance your career</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
