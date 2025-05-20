import { NextResponse } from "next/server";
import supabase from "../../../utilities/supabase";

type Data = {
    totalGames: number,
    lastDate: Date
};

export async function POST(request: Request) {
    try {
        const logEntry: Data = await request.json();

        const entryText = "Current Number of Games Stored: " + logEntry.totalGames + " Last Saved Data: " + logEntry.lastDate;

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