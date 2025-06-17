import prisma from '@/lib/server/prisma';
import{NextRequest, NextResponse} from 'next/server';

interface Context {
    params: {
        id: string;
    }
}

export async function GET(
    req: NextRequest,
    ctx: Context
){

    const {id} = await ctx.params;
    if(!id) {
        return NextResponse.json({
            ok: false,
        })
    }

    const numId = +id;
    const post = await prisma.post.findUnique({
        where: {
            id: numId,
        },
    })

    if(!post) {
        return NextResponse.json({
            ok: false,
            error: 'Post not found',
        })
    }

    return NextResponse.json({
        ok: true,
        post: post,
    })
}