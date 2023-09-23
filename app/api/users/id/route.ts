import {NextRequest, NextResponse} from "next/server";

export function GET(request: NextRequest) {
    const { id } = request.nextUrl.query;
    const user = users.find(u => u.id === parseInt(id as string));

    if (!user) {
        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}