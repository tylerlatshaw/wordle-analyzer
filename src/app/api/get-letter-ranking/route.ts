import { NextResponse } from "next/server";
import { LetterRankingType } from "../../../app/lib/type-library";
import supabase from "../../../utilities/supabase";
import { cookies } from "next/headers";

export async function GET() {

    const session = (await cookies()).get("session_key")?.value;

    if (!session) {
        return new Response("Error: session key missing. Access denied.", { status: 403 });
    }
    
    try {
        const { data } = await supabase.from("letter_ranking").select().order("letter");

        const results: LetterRankingType[] = [];

        data?.forEach((row) => {
            results.push({
                LetterId: row.id,
                Letter: row.letter,
                Position: row.position,
                Score: row.score
            });
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}