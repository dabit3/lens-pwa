import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {User} from "@/app/api/models/users";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let users: User[] = []; // mock data store.

export function GET(request: NextRequest) {
    return NextResponse.json(
        {
            body: request.body,
            path: request.nextUrl.pathname,
            query: request.nextUrl.search,
            cookies: request.cookies.getAll(),
        },
        {
            status: 200,
        },
    );
}

export async function POST(request: NextRequest) {
    const data = await request.text();

    let parsedBody;
    try {
        parsedBody = JSON.parse(data);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }

    if (!parsedBody.walletAddress || !parsedBody.contractAddress) {
        return NextResponse.json({ message: 'Missing walletAddress or contractAddress.' }, { status: 400 });
    }

    const newUser: User = {
        id: Date.now(),
        walletAddress: parsedBody.walletAddress,
        contractAddress: parsedBody.contractAddress,
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
}
