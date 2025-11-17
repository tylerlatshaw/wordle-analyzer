import { NextResponse } from "next/server";
import { WordType } from "../../lib/type-library";
import supabase from "../../../utilities/supabase";
import { cookies } from "next/headers";

export async function GET() {

    const session = (await cookies()).get("session_key")?.value;

    if (!session) {
        return new Response("Error: session key missing. Access denied.", { status: 403 });
    }

    try {
        const { data } = await supabase.from("possible_words").select();

        const results: WordType[] = [];

        data?.forEach((row) => {
            results.push({
                WordleWordId: row.id,
                Word: row.word,
                Score: row.score
            });
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}