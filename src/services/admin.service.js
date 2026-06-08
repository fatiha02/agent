import User from '@/models/User';
import Course from '@/models/Course';
import Enrollment from '@/models/Enrollment';
import dbConnect from '@/lib/mongoose';
import { COURSE_STATUS } from '@/utils/constants';

export async function getAllUsers() {
    await dbConnect();
    return User.find({}).sort({ createdAt: -1 });
}

export async function updateUserStatus(userId, status) {
    await dbConnect();
    return User.findByIdAndUpdate(userId, { accountStatus: status }, { new: true });
}

export async function approveInstructor(userId) {
    await dbConnect();
    return User.findByIdAndUpdate(userId, { isApproved: true }, { new: true });
}

export async function getAllCoursesAdmin() {
    await dbConnect();
    return Course.find({}).populate('instructorId', 'name email').sort({ createdAt: -1 });
}

export async function updateCourseStatusAdmin(courseId, status, rejectionReason = '') {
    await dbConnect();
    return Course.findByIdAndUpdate(
        courseId,
        { status, rejectionReason },
        { new: true }
    );
}

export async function getAllEnrollmentsAdmin() {
    await dbConnect();
    return Enrollment.find({})
        .populate('studentId', 'name email')
        .populate('courseId', 'title price')
        .sort({ enrolledAt: -1 });
}

export async function getAdminStats() {
    await dbConnect();
    const [userCount, courseCount, enrollmentCount, totalRevenue] = await Promise.all([
        User.countDocuments({}),
        Course.countDocuments({}),
        Enrollment.countDocuments({}),
        Enrollment.aggregate([
            { $match: { paymentStatus: 'COMPLETED' } },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'courseId',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            { $unwind: '$course' },
            { $group: { _id: null, total: { $sum: '$course.price' } } }
        ])
    ]);

    return {
        userCount,
        courseCount,
        enrollmentCount,
        totalRevenue: totalRevenue[0]?.total || 0
    };
}
