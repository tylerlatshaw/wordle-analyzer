import { NextResponse } from "next/server";
import { LetterRankingType } from "../../../app/lib/type-library";
import supabase from "@/utilities/supabase";

export async function GET() {
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