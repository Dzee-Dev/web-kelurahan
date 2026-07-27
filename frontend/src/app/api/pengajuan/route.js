import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Forward multipart form data ke backend Express
    const response = await fetch(`${BACKEND_URL}/api/pengajuan`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (err) {
    console.error('Proxy POST /api/pengajuan error:', err);
    return NextResponse.json(
      { success: false, error: { message: err.message || 'Backend tidak tersedia atau payload terlalu besar' } },
      { status: 502 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { message: 'ID diperlukan' } },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/pengajuan/${id}`);
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (err) {
    console.error('Proxy GET /api/pengajuan error:', err);
    return NextResponse.json(
      { success: false, error: { message: err.message || 'Backend tidak tersedia' } },
      { status: 502 }
    );
  }
}
