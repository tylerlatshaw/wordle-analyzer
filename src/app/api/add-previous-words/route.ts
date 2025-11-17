import { NextResponse } from "next/server";
import supabase from "../../../utilities/supabase";
import { PreviousGameInputType, PreviousGameType, WordType } from "@/app/lib/type-library";
import dayjs from "dayjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {

    const session = (await cookies()).get("session_key")?.value;

    if (!session) {
        return new Response("Error: session key missing. Access denied.", { status: 403 });
    }
    
    const requestData: PreviousGameInputType = await request.json();
    const gamesToAdd: PreviousGameInputType["GameData"] = requestData.GameData;
    const matchedWords: PreviousGameType[] = [];
    const addedGames: PreviousGameType[] = [];
    const invalidWords: PreviousGameInputType["GameData"] = [];
    const requestKey = request.headers.get("x-api-key");

    if (requestKey !== process.env.API_KEY) {
        return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
    }

    try {
        const { data: possibleWords, error: selectError } = await supabase
            .from("possible_words")
            .select();

        if (possibleWords) {
            gamesToAdd.forEach(async (game) => {
                const matchedWord = possibleWords?.find((word) => {
                    return word.word.toUpperCase() === game.Word.toUpperCase();
                });

                if (matchedWord !== undefined) {
                    matchedWords.push({
                        GameId: game.GameId!,
                        GameDate: dayjs(game.GameDate),
                        Word: {
                            WordleWordId: matchedWord!.id,
                            Word: matchedWord!.word.toUpperCase(),
                            Score: matchedWord!.score
                        }
                    });
                } else {
                    invalidWords.push({
                        GameId: game.GameId,
                        GameDate: dayjs(game.GameDate).toString(),
                        Word: game.Word.toUpperCase()
                    });
                }
            });
        }

        if (selectError) {
            console.error("Insert error:", selectError);
            return NextResponse.json({ error: "Unexpected server error: " + selectError }, { status: 500 });
        }

        for (const word of matchedWords) {
            const { data, error } = await supabase
                .from("previous_words")
                .insert({
                    game_date: dayjs(word.GameDate).format("YYYY-MM-DD"),
                    word_id: (word.Word as WordType).WordleWordId,
                    game_id: word.GameId
                })
                .select();

            if (data) {
                data.forEach((item) => {
                    addedGames.push({
                        Id: item.id,
                        GameId: item.game_id,
                        GameDate: dayjs(item.game_date),
                        Word: {
                            WordleWordId: (word.Word as WordType).WordleWordId,
                            Word: (word.Word as WordType).Word,
                            Score: (word.Word as WordType).Score
                        }
                    });
                });
            }

            if (error) {
                console.error("Insert error:", error);
                return NextResponse.json({ error: "Unexpected server error: " + error }, { status: 500 });
            }
        }

        return NextResponse.json({ addedData: addedGames, invalidData: invalidWords }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Unexpected server error: " + error }, { status: 500 });
    }
}