import { NextResponse } from "next/server";
import { WordType } from "../../lib/type-library";
import supabase from "../../../utilities/supabase";

type Columns = {
    id: number,
    word: string,
    score: number
};

export async function POST(request: Request) {
    try {
        const { possibleWords }: { possibleWords: WordType[] } = await request.json();

        const upsertData: Columns[] = possibleWords.map(item => ({
            id: item.WordleWordId,
            word: item.Word,
            score: item.Score
        }));

        const { data, error } = await supabase
            .from("possible_words")
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