/* eslint-disable import/no-anonymous-default-export */
import { Config } from "@netlify/functions";

async function getData() {
    const res = await fetch(process.env.BASE_URL + "/api/get-previous-words");
    return res.json();
}

export default async () => {
    const data = await getData();

    const sortedData = data.sort((a, b) =>
        (a.GameId < b.GameId) ? 1 : -1
    );

    console.log("Current Number of Games Stored: " + data.length + " Last Saved Data: " + sortedData[0].GameDate);

    return new Response(data);
};

export const config: Config = {
    schedule: "30 * * * *"
};