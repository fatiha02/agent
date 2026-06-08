import React from 'react';
import { getAllUsersAction, updateUserStatusAction } from '@/server-actions/admin.actions';
import UserTable from '@/components/admin/UserTable';
import { ShieldAlert } from 'lucide-react';

export default async function AdminUsersPage() {
    const { success, users, error } = await getAllUsersAction();

    if (!success) {
        return <div className="p-20 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-gray-900">User Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Control platform access and user roles.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-xl text-xs font-bold border border-yellow-100">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Admin Only Area</span>
                </div>
            </div>

            <UserTable
                users={users}
                onUpdateStatus={async (id, status) => {
                    'use server';
                    await updateUserStatusAction(id, status);
                }}
            />
        </div>
    );
}
