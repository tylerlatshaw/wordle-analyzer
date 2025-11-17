import { cookies } from "next/headers";

export async function GET() {

    const existing = (await cookies()).get("session_key");

    if (!existing) {
        const key = crypto.randomUUID();
        (await cookies()).set("session_key", key, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
    }

    return Response.json({ ok: true });
}