import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Allow these routes WITHOUT session_key
    if (
        pathname.startsWith("/api/get-session-key") ||
        pathname.startsWith("/api/verify-turnstile") ||
        pathname.startsWith("/api/add-log-entry") // As this will be handled with an API Key instead
    ) {
        return NextResponse.next();
    }

    // Protect all other API routes
    if (pathname.startsWith("/api/")) {
        const session = req.cookies.get("session_key")?.value;

        if (!session) {
            return new NextResponse("Error: session key missing. Access denied.", { status: 403 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/:path*"],
};