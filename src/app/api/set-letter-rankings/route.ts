import { NextResponse } from "next/server";
import { LetterRankingInputType } from "../../lib/type-library";
import supabase from "../../../utilities/supabase";

type Columns = {
    id: number,
    letter: string,
    position: number,
    score: number
};

export async function POST(request: Request) {
    const requestData: LetterRankingInputType = await request.json();
    const letterRanking: LetterRankingInputType["LetterRanking"] = requestData.LetterRanking;
    const requestKey = request.headers.get("x-api-key");

    if (requestKey !== process.env.API_KEY) {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
    }

    try {
        const upsertData: Columns[] = [];

        letterRanking.map(item => {
            upsertData.push({
                id: item.LetterId,
                letter: item.Letter,
                position: item.Position,
                score: item.Score
            });
        });

        const { data, error } = await supabase
            .from("letter_ranking")
            .upsert(upsertData)
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Unexpected server error: " + error.message }, { status: 500 });
        }

        return NextResponse.json({ letterRanking: data }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}