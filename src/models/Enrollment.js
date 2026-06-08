import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
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
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FREE'],
        default: 'FREE',
    },
    paymentId: {
        type: String,
    },
}, {
    timestamps: true,
});

// Ensure a student can only enroll once in a specific course
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
