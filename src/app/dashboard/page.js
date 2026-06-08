import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardRedirect() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    if (session.user.role === 'ADMIN') {
        redirect('/admin/dashboard');
    } else if (session.user.role === 'INSTRUCTOR') {
        redirect('/instructor/dashboard');
    } else {
        redirect('/student/dashboard');
    }

    return null;
}
