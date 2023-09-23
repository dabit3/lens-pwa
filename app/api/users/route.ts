import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {User} from "@/app/models/user";

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

export function POST(request: NextRequest) {
    const name = request.body?.name;
    const email = request.body?.email;

    if (name && email) {
        const user: User = {
            id: Date.now(),
            name,
            email,
        };
        users.push(user);
    } else {
        return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }


    users.push(user);

    return NextResponse.json(user, { status: 201 });
}