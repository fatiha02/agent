import { NextResponse } from 'next/server';
import { getPublicCourses } from '@/services/course.service';

export async function GET() {
    try {
        const courses = await getPublicCourses();

        return NextResponse.json({
            success: true,
            count: courses.length,
            courses: courses
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
