import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a lesson title.'],
        trim: true,
    },
    videoUrl: {
        type: String,
        required: [true, 'Please provide a video URL.'],
        trim: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);
