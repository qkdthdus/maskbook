import prisma from '@/lib/server/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const postList = await prisma.post.findMany(
        {}
    )
    return NextResponse.json({
        ok: true,
        postList: postList,
        text: 'Hello World',
    })
}