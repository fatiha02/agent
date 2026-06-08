import { NextResponse } from 'next/server';
import { initiateCheckout } from '@/server-actions/payment.actions';

export async function POST(req) {
    try {
        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
        }

        const result = await initiateCheckout(courseId);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ url: result.url });
    } catch (error) {
        console.error('API checkout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
