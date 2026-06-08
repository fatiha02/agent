'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ className = "" }) => {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-xl ${className}`}
        >
            <LogOut className="w-4 h-4" />
            Log Out
        </button>
    );
};

export default LogoutButton;
