'use client';

import React, { useState } from 'react';
import { enrollInCourseAction } from '@/server-actions/enrollment.actions';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const EnrollmentButton = ({ courseId, isEnrolled, isFree, isLoggedIn }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEnroll = async () => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        setLoading(true);

        if (!isFree) {
            try {
                const response = await fetch('/api/payments/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ courseId }),
                });
                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || 'Failed to initiate checkout.');
                }
            } catch (error) {
                alert(error.message);
                setLoading(false);
            }
            return;
        }

        const result = await enrollInCourseAction(courseId);
        if (result.success) {
            router.push(`/student/learn/${courseId}`);
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    if (isEnrolled) {
        return (
            <Button
                onClick={() => router.push(`/student/learn/${courseId}`)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-100 transition-all"
            >
                Continue Learning
            </Button>
        );
    }

    return (
        <Button
            onClick={handleEnroll}
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all"
        >
            {isFree ? 'Enroll Now' : 'Buy Now'}
        </Button>
    );
};

export default EnrollmentButton;
