import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  let blob;
  if (request?.body) {
    blob = await put(filename ? filename : '', request.body, {
      access: 'public',
    });
  }

  console.log(blob);

  return NextResponse.json(blob);
}
