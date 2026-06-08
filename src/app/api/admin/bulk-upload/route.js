import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import Lesson from '@/models/Lesson';

/**
 * POST /api/admin/bulk-upload
 * Admin-only endpoint to bulk upload courses with lessons
 * 
 * Expected JSON format:
 * {
 *   "courseTitle": "Course Name",
 *   "description": "Course description",
 *   "thumbnail": "https://image-url.jpg",
 *   "category": "Web Development",
 *   "isFree": true,
 *   "price": 0,
 *   "instructorId": "instructor_mongodb_id",
 *   "lessons": [
 *     { "title": "Lesson 1", "videoUrl": "https://video1", "duration": 300 },
 *     { "title": "Lesson 2", "videoUrl": "https://video2", "duration": 420 }
 *   ]
 * }
 */
export async function POST(req) {
    try {
        // Check authentication and admin role
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized. Admin access required.' },
                { status: 403 }
            );
        }

        await dbConnect();

        const body = await req.json();

        // Validate required fields
        if (!body.courseTitle || !body.instructorId || !body.lessons || !Array.isArray(body.lessons)) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: courseTitle, instructorId, lessons' },
                { status: 400 }
            );
        }

        // Create the course
        const course = await Course.create({
            title: body.courseTitle,
            description: body.description || 'No description provided',
            thumbnail: body.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
            category: body.category || 'General',
            price: body.price || 0,
            isFree: body.isFree !== undefined ? body.isFree : true,
            status: 'PUBLISHED', // Auto-publish for admin uploads
            instructorId: body.instructorId,
        });

        // Create lessons
        const createdLessons = [];
        for (let i = 0; i < body.lessons.length; i++) {
            const lessonData = body.lessons[i];

            const lesson = await Lesson.create({
                title: lessonData.title,
                videoUrl: lessonData.videoUrl,
                duration: lessonData.duration || 0,
                order: i + 1,
                courseId: course._id,
            });

            createdLessons.push(lesson);
        }

        return NextResponse.json({
            success: true,
            message: `Course created successfully with ${createdLessons.length} lessons`,
            data: {
                courseId: course._id,
                courseTitle: course.title,
                lessonsCreated: createdLessons.length,
            }
        });

    } catch (error) {
        console.error('Bulk upload error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to upload course' },
            { status: 500 }
        );
    }
}
