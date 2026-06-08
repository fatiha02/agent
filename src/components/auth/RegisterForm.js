'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validators/auth.validator';
import { registerAction } from '@/server-actions/auth.actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, GraduationCap, Users } from 'lucide-react';

const RegisterForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('STUDENT');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'STUDENT',
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');

        const result = await registerAction(data);

        if (result.success) {
            router.push('/login?registered=true');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setValue('role', role);
    };

    return (
        <div className="w-full space-y-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Create your account</h1>
                <p className="text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Role Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">I am a...</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => handleRoleSelect('STUDENT')}
                            className={`p-4 border-2 rounded-xl transition-all ${selectedRole === 'STUDENT'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <GraduationCap className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'STUDENT' ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div className={`text-sm font-bold ${selectedRole === 'STUDENT' ? 'text-blue-600' : 'text-gray-700'}`}>
                                Student
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Learn new skills</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleSelect('INSTRUCTOR')}
                            className={`p-4 border-2 rounded-xl transition-all ${selectedRole === 'INSTRUCTOR'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <Users className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'INSTRUCTOR' ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div className={`text-sm font-bold ${selectedRole === 'INSTRUCTOR' ? 'text-blue-600' : 'text-gray-700'}`}>
                                Instructor
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Teach & earn</div>
                        </button>
                    </div>
                    <input type="hidden" {...register('role')} />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Full name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            {...register('name')}
                            placeholder="Enter your full name"
                            className={`w-full pl-12 pr-4 py-3.5 border ${errors.name ? 'border-red-300' : 'border-gray-200'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all`}
                        />
                    </div>
                    {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Email address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full pl-12 pr-4 py-3.5 border ${errors.email ? 'border-red-300' : 'border-gray-200'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all`}
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Create a password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Create a password"
                            className={`w-full pl-12 pr-4 py-3.5 border ${errors.password ? 'border-red-300' : 'border-gray-200'
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all`}
                        />
                    </div>
                    {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-base transition-all shadow-lg shadow-blue-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? 'Creating account...' : 'Create account'}
                    {!loading && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
