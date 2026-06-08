import Lesson from '@/models/Lesson';
import dbConnect from '@/lib/mongoose';

export async function createLesson(data) {
    await dbConnect();
    const lesson = await Lesson.create(data);
    return lesson;
}

export async function updateLesson(lessonId, data) {
    await dbConnect();
    const lesson = await Lesson.findByIdAndUpdate(
        lessonId,
        { $set: data },
        { new: true, runValidators: true }
    );
    if (!lesson) {
        throw new Error('Lesson not found.');
    }
    return lesson;
}

export async function deleteLesson(lessonId) {
    await dbConnect();
    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) {
        throw new Error('Lesson not found.');
    }
    return lesson;
}

export async function getLessonsByCourseId(courseId) {
    await dbConnect();
    return Lesson.find({ courseId }).sort({ order: 1 });
}

export async function reorderLessons(lessonIds) {
    await dbConnect();
    const ops = lessonIds.map((id, index) => ({
        updateOne: {
            filter: { _id: id },
            update: { $set: { order: index } },
        },
    }));
    await Lesson.bulkWrite(ops);
}
