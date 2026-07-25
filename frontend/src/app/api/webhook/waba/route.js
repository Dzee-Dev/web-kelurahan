import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const expectedToken = process.env.WABA_VERIFY_TOKEN || 'rahasia_kelurahan_123';

    if (mode === 'subscribe' && token === expectedToken) {
      console.log('✅ WABA Webhook Verified on Vercel!');
      return new Response(challenge, { status: 200 });
    }

    return new Response('Forbidden', { status: 403 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('📥 WABA Webhook Event on Vercel:', JSON.stringify(body, null, 2));

    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ status: 'ERROR', error: err.message }, { status: 200 });
  }
}
