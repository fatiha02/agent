import Progress from '@/models/Progress';
import dbConnect from '@/lib/mongoose';

export async function getProgress(studentId, courseId, lessonId) {
    await dbConnect();
    return Progress.findOne({ studentId, courseId, lessonId });
}

export async function updateProgress(studentId, courseId, lessonId, data) {
    await dbConnect();
    return Progress.findOneAndUpdate(
        { studentId, courseId, lessonId },
        { $set: data },
        { upsert: true, new: true, runValidators: true }
    );
}

export async function getCourseProgress(studentId, courseId) {
    await dbConnect();
    const progressList = await Progress.find({ studentId, courseId });
    return progressList;
}

export async function getCompletionCount(studentId, courseId) {
    await dbConnect();
    return Progress.countDocuments({ studentId, courseId, completed: true });
}
