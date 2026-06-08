import React from 'react';
import { getAllEnrollmentsAdminAction } from '@/server-actions/admin.actions';
import PaymentTable from '@/components/admin/PaymentTable';
import { Banknote } from 'lucide-react';

export default async function AdminPaymentsPage() {
    const { success, enrollments, error } = await getAllEnrollmentsAdminAction();

    if (!success) {
        return <div className="p-20 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-gray-900">Payment Audit</h1>
                    <p className="text-sm text-gray-500 font-medium">Track all transactions and enrollments.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold border border-green-100">
                    <Banknote className="w-4 h-4" />
                    <span>Transaction History</span>
                </div>
            </div>

            <PaymentTable enrollments={enrollments} />
        </div>
    );
}
