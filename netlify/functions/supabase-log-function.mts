/* eslint-disable import/no-anonymous-default-export */
import { Config } from "@netlify/functions";

type Data = {
    totalGames: number,
    lastDate: Date
};

async function getData() {
    const res = await fetch(process.env.BASE_URL + "/api/get-previous-words");
    return res.json();
}

async function setData(logEntry: Data) {
    const res = await fetch(process.env.BASE_URL + "/api/add-log-entry", {
        method: "POST",
        body: JSON.stringify(logEntry)
    });
    return res.json();
}

export default async () => {
    const data = await getData();

    const sortedData = data.sort((a, b) =>
        (a.GameId < b.GameId) ? 1 : -1
    );

    const postRequest = await setData({ totalGames: data.length, lastDate: sortedData[0].GameDate });

    console.log(postRequest);

    return new Response(data);
};

export const config: Config = {
    schedule: "@daily"
};