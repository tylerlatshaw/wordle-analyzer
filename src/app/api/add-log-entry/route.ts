import { NextResponse } from "next/server";
import supabase from "../../../utilities/supabase";
import { PreviousGameType } from "@/app/lib/type-library";
import dayjs from "dayjs";

export async function POST(request: Request) {

    const key = request.headers.get("x-api-key");

    if (key != process.env.API_KEY) {
        return new Response("Error: invalid API key. Access denied.", { status: 403 });
    }

    try {
        const { data: prevWordRes } = await supabase.from("previous_words").select(`
            game_id,
            game_date,
            possible_words (id, word, score)
        `);

        const results: PreviousGameType[] = [];

        prevWordRes?.forEach((row) => {
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

        results.sort((a, b) =>
            (a.GameId < b.GameId) ? 1 : -1
        );

        const entryText = "Current Number of Games Stored: " + results.length + " Last Saved Data: " + results[0].GameDate;

        const { data, error } = await supabase
            .from("table_log")
            .insert({
                "log_entry": entryText
            })
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