import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    lastWatchedTime: {
        type: Number, // in seconds
        default: 0,
    },
}, {
    timestamps: true,
});

// Ensure unique progress record per student, course, and lesson
ProgressSchema.index({ studentId: 1, courseId: 1, lessonId: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
