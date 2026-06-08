import { NextResponse } from 'next/server';
import { handleWebhookEvent } from '@/services/payment.service';
import { headers } from 'next/headers';

export async function POST(req) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    try {
        await handleWebhookEvent(body, signature);
        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// Config to disable body parsing for Stripe webhooks
export const config = {
    api: {
        bodyParser: false,
    },
};
