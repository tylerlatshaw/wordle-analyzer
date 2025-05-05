import { NextResponse } from "next/server";
import { LetterRankingType } from "../../lib/type-library";
import supabase from "../../../utilities/supabase";

type Columns = {
    id: number,
    letter: string,
    position: number,
    score: number
};

export async function POST(request: Request) {
    try {
        const { letterRanking }: { letterRanking: LetterRankingType[] } = await request.json();

        const upsertData: Columns[] = letterRanking.map(item => ({
            id: item.LetterId,
            letter: item.Letter,
            position: item.Position,
            score: item.Score
        }));

        const { data, error } = await supabase
            .from("letter_ranking")
            .upsert(upsertData)
            .select();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
    }
}