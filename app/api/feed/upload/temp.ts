import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || '';

  let blob;
  if (request.body !== null) {
    blob = await put(filename, request.body, {
      access: 'public',
    });
  } else {
    // handle the case where request.body is null
    throw new Error('Request body is null');
  }

  return NextResponse.json(blob);
}
