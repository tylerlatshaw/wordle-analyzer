import { NextResponse } from "next/server";
import { PreviousGameType } from "../../../app/lib/type-library";
import supabase from "../../../utilities/supabase";
import dayjs from "dayjs";

export async function GET() {
    try {
        const { data } = await supabase.from("previous_words").select(`
            game_id,
            game_date,
            possible_words (id, word, score)
        `);

        const results: PreviousGameType[] = [];

        data?.forEach((row) => {
            results.push({
                GameId: row.game_id,
                GameDate: dayjs(row.game_date).format("MM/DD/YYYY"),
                Word: {
                    WordleWordId: row.possible_words.id,
                    Word: row.possible_words.word,
                    Score: row.possible_words.score
                }
            });
        });

        return NextResponse.json(results);
    } catch (error) {
        console.error("Error fetching data: ", error);
        return new NextResponse("Error fetching data");
    }
}