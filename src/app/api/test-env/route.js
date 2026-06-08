import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        MONGODB_URI: process.env.MONGODB_URI ? 'Set (hidden)' : 'NOT SET',
        MONGODB_URI_first_50: process.env.MONGODB_URI?.substring(0, 50),
    });
}
