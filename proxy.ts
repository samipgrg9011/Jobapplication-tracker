import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";


export default async function proxy(request: NextRequest) {
    const session = await getSession();

    const IsDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

    if (IsDashboardPage && !session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    const IsSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
    const IsSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

    if ((IsSignInPage || IsSignUpPage ) && session?.user) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }




    return NextResponse.next();


    // return NextResponse.redirect(new URL("/sign-in", request.url))
}
