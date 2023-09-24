import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const data = await request.text();

    let parsedBody;
    try {
        parsedBody = JSON.parse(data);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }

    const { uri, caption, creatorWalletAddress } = parsedBody;

    if (!uri || !creatorWalletAddress) {
        return NextResponse.json({ message: 'URI and creatorWalletAddress are required fields.' }, { status: 400 });
    }

    try {
        const newMedia = await prisma.media.create({
            data: {
                uri,
                caption: caption || '',  // If caption is not provided, use an empty string
                creatorWalletAddress
            }
        });

        return NextResponse.json(newMedia, { status: 201 });

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ message: `Failed to create new Media: ${error.message}` }, { status: 500 });
    }
}
