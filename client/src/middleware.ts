import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const verify = req.cookies.get("refreshtoken");

    if (!verify && req.nextUrl.pathname === "/") return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    if (verify && req.url.includes("/register")) return NextResponse.redirect(`${req.nextUrl.origin}/`);
    if (verify && req.url.includes("/login")) return NextResponse.redirect(`${req.nextUrl.origin}/`);

    

}