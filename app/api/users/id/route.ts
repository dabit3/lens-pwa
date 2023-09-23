import {NextRequest, NextResponse} from "next/server";
import {User} from "@/app/api/models/users";

let users: User[] = []; // mock data store.

export function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ message: 'ID not provided.' }, { status: 400 });
    }
    const numericId = parseInt(id, 10);

    const user = users.find(u => u.id === numericId);

    if (!user) {
        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}