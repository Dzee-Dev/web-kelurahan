import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

async function handleProxy(req, { params }) {
  try {
    const resolvedParams = await params;
    const pathArray = resolvedParams?.path || [];
    const path = pathArray.join('/');
    const url = new URL(req.url);
    const targetUrl = `${BACKEND_URL}/api/${path}${url.search}`;

    const headers = new Headers();
    if (req.headers.get('content-type')) {
      headers.set('content-type', req.headers.get('content-type'));
    }
    if (req.headers.get('cookie')) {
      headers.set('cookie', req.headers.get('cookie'));
    }

    const options = {
      method: req.method,
      headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      options.body = await req.arrayBuffer();
    }

    const res = await fetch(targetUrl, options);
    const contentType = res.headers.get('content-type') || 'application/json';
    const data = await res.arrayBuffer();
    const responseHeaders = new Headers({
      'content-type': contentType,
      'cache-control': 'no-store',
    });
    const contentDisposition = res.headers.get('content-disposition');
    if (contentDisposition) {
      responseHeaders.set('content-disposition', contentDisposition);
    }

    const response = new NextResponse(data, {
      status: res.status,
      headers: responseHeaders,
    });

    const setCookies = typeof res.headers.getSetCookie === 'function'
      ? res.headers.getSetCookie()
      : [res.headers.get('set-cookie')].filter(Boolean);
    for (const cookie of setCookies) {
      response.headers.append('set-cookie', cookie);
    }

    return response;
  } catch (err) {
    console.error('Universal Proxy Error:', err.message);
    return NextResponse.json(
      { success: false, error: { message: 'Gagal terhubung ke server backend' } },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PATCH = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
