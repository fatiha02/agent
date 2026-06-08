import Course from '@/models/Course';
import dbConnect from '@/lib/mongoose';
import { COURSE_STATUS } from '@/utils/constants';

export async function createCourse(data, instructorId) {
    await dbConnect();
    const course = await Course.create({
        ...data,
        instructorId,
    });
    return course;
}

export async function updateCourse(courseId, data, instructorId) {
    await dbConnect();
    const course = await Course.findOneAndUpdate(
        { _id: courseId, instructorId },
        { $set: data },
        { new: true, runValidators: true }
    );
    if (!course) {
        throw new Error('Course not found or unauthorized.');
    }
    return course;
}

export async function getCourseById(courseId) {
    await dbConnect();
    return Course.findById(courseId).populate('instructorId', 'name email');
}

export async function getInstructorCourses(instructorId) {
    await dbConnect();
    return Course.find({ instructorId }).sort({ createdAt: -1 });
}

export async function getPublicCourses() {
    console.log('[SERVICE] getPublicCourses called');
    await dbConnect();
    console.log('[SERVICE] DB connected');

    const courses = await Course.find({ status: COURSE_STATUS.PUBLISHED })
        .sort({ createdAt: -1 })
        .lean();

    console.log('[SERVICE] Query complete. Found:', courses.length, 'courses');
    console.log('[SERVICE] COURSE_STATUS.PUBLISHED =', COURSE_STATUS.PUBLISHED);

    return courses;
}

export async function deleteCourse(courseId, instructorId) {
    await dbConnect();
    const course = await Course.findOneAndDelete({ _id: courseId, instructorId });
    if (!course) {
        throw new Error('Course not found or unauthorized.');
    }
    return course;
}
