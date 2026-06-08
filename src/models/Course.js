import mongoose from 'mongoose';
import { COURSE_STATUS } from '@/utils/constants';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description.'],
    },
    thumbnail: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        default: 0,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        required: [true, 'Please specify a category.'],
    },
    status: {
        type: String,
        enum: [COURSE_STATUS.DRAFT, COURSE_STATUS.PENDING, COURSE_STATUS.PUBLISHED],
        default: COURSE_STATUS.DRAFT,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rejectionReason: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
