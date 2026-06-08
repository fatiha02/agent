import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { BookOpen, Users, Award, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'Register | AlfaLearning',
    description: 'Create a new account on AlfaLearning e-learning platform.',
};

export default function RegisterPage() {
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
                                Begin your learning adventure today
                            </h1>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Join thousands of learners and instructors. Create an account to unlock unlimited access.
                            </p>
                        </div>

                        <div className="space-y-4 pt-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Access 5,000+ courses</h3>
                                    <p className="text-sm text-blue-200">Learn anything from programming to design</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Learn from expert instructors</h3>
                                    <p className="text-sm text-blue-200">World-class professionals teaching you</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Earn certificates</h3>
                                    <p className="text-sm text-blue-200">Showcase your achievements</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                        <p className="text-sm text-blue-100 italic">
                            "AlfaLearning transformed my career. The courses are top-notch and the instructors are incredibly supportive!"
                        </p>
                        <p className="text-xs text-blue-200 mt-3 font-semibold">— Sarah Johnson, Student</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <RegisterForm />
                </div>
            </div>
        </main>
    );
}
