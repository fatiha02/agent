'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import * as adminService from '@/services/admin.service';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized. Admin access required.');
    }
    return session;
}

export async function updateUserStatusAction(userId, status) {
    try {
        await checkAdmin();
        const user = await adminService.updateUserStatus(userId, status);
        revalidatePath('/admin/users');
        return { success: true, user: JSON.parse(JSON.stringify(user)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function approveCourseAction(courseId) {
    try {
        await checkAdmin();
        const course = await adminService.updateCourseStatusAdmin(courseId, 'PUBLISHED');
        revalidatePath('/admin/courses');
        revalidatePath('/');
        revalidatePath('/courses');
        return { success: true, course: JSON.parse(JSON.stringify(course)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function rejectCourseAction(courseId, reason) {
    try {
        await checkAdmin();
        const course = await adminService.updateCourseStatusAdmin(courseId, 'DRAFT', reason);
        revalidatePath('/admin/courses');
        return { success: true, course: JSON.parse(JSON.stringify(course)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAdminStatsAction() {
    try {
        await checkAdmin();
        const stats = await adminService.getAdminStats();
        return { success: true, stats };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllUsersAction() {
    try {
        await checkAdmin();
        const users = await adminService.getAllUsers();
        return { success: true, users: JSON.parse(JSON.stringify(users)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllCoursesAdminAction() {
    try {
        await checkAdmin();
        const courses = await adminService.getAllCoursesAdmin();
        return { success: true, courses: JSON.parse(JSON.stringify(courses)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getAllEnrollmentsAdminAction() {
    try {
        await checkAdmin();
        const enrollments = await adminService.getAllEnrollmentsAdmin();
        return { success: true, enrollments: JSON.parse(JSON.stringify(enrollments)) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
