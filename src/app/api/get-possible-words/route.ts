import { NextResponse } from "next/server";
import { WordType } from "../../../app/lib/type-library";
import supabase from "../../../utilities/supabase";

export async function GET() {
    try {
        const previousGameData = await supabase.from("previous_words").select(`
            game_id,
            game_date,
            possible_words (id, word, score)
        `);

        const previousGameList: number[] = [];

        previousGameData.data?.forEach((row) => {
            previousGameList.push(row.possible_words.id);
        });

        const wordData = await supabase.from("possible_words").select().not("id","in",`(${previousGameList})`);

        const wordResults: WordType[] = [];

        wordData.data?.forEach((row) => {
            wordResults.push({
                WordleWordId: row.id,
                Word: row.word,
                Score: row.score
            });
        });

        return NextResponse.json(wordResults);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}