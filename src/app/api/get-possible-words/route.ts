import { NextResponse } from "next/server";
import { WordType } from "../../../app/lib/type-library";
import supabase from "../../../utilities/supabase";

export async function GET() {
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