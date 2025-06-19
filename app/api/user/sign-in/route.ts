import prisma from "@/lib/server/prisma";
import { generateSaltedHash } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/lib/session";

export async function POST (req: NextRequest, ctx: any){
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );

    if(session.isLoggedIn){
        return NextResponse.json({
            ok: false,
        })
    }

    const {email, password} = await req.json();
    const passwordHash = generateSaltedHash(password);
    const user = await prisma.user.findFirst({
        where:{
            email,
            passwordHash
        }
    });
    
    if(user) {
        session.userId = user.id;
        session.email = email;
        session.isLoggedIn = true;
        await session.save();
        return NextResponse.json({
            ok: true,
        })
    }
    return NextResponse.json({
        ok: false,
    })
}