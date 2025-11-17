import { NextResponse } from "next/server";
import { WordRankingInputType } from "../../lib/type-library";
import supabase from "../../../utilities/supabase";
import { cookies } from "next/headers";

type Columns = {
    id: number,
    word: string,
    score: number
};

export async function POST(request: Request) {

    const session = (await cookies()).get("session_key")?.value;

    if (!session) {
        return new Response("Error: session key missing. Access denied.", { status: 403 });
    }
    
    const requestData: WordRankingInputType = await request.json();
    const wordRanking: WordRankingInputType["WordRanking"] = requestData.WordRanking;
    const requestKey = request.headers.get("x-api-key");

    if (requestKey !== process.env.API_KEY) {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
    }

    try {
        const upsertData: Columns[] = [];

        wordRanking.map(item => {
            upsertData.push({
                id: item.WordleWordId,
                word: item.Word,
                score: item.Score
            });
        });

        const { data, error } = await supabase
            .from("possible_words")
            .upsert(upsertData)
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Unexpected server error: " + error.message }, { status: 500 });
        }

        return NextResponse.json({ wordRanking: data }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}