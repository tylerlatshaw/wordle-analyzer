"use client";

import { LetterRankingType, PreviousGameType, WordType } from "@/app/lib/type-library";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddPreviousGameContainer } from "./add-previous-game-container";
import { UpdateScoresContainer } from "./update-scores-container";
import { AddPreviousGameLoadingContainer } from "./add-previous-game-loading-container";
import { UpdateScoresLoadingContainer } from "./update-scores-loading-container";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

export function UtilityContainer() {

    const [possibleWords, setPossibleWords] = useState<WordType[]>([]);
    const [letterRanking, setLetterRanking] = useState<LetterRankingType[]>([]);
    const [previousGames, setPreviousGames] = useState<PreviousGameType[]>([]);
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<string>("");
    const [mostRecentGame, setMostRecentGame] = useState<PreviousGameType>();

    useEffect(() => {
        try {
            axios.get("/api/get-session-key")
                .then(() => Promise.all([
                    axios.get("/api/get-all-words").then((response) => {
                        setPossibleWords(response.data);
                    }),
                    axios.get("/api/get-letter-ranking").then((response) => {
                        setLetterRanking(response.data);
                    }),
                    axios.get("/api/get-previous-words").then((response) => {
                        setPreviousGames(response.data);
                        setMostRecentGame(getMostRecentGame(response.data));
                    })
                ]).then(() =>
                    setLoadingState(false)
                ));
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

        function getMostRecentGame(games: PreviousGameType[]) {
            const game = games.reduce((prev, current) => {
                return (prev && prev.GameId > current.GameId) ? prev : current;
            });
            return game;
        }
    }, []);

    const inputTextColor = apiKey === "" && isDirty ? "#9E0812" : "";
    const inputBackgroundColor = apiKey === "" && isDirty ? "#9E081220" : "#f1f5f9";

    return <>
        {
            loadingState ? <>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 w-full mt-2 mb-4">
                    <div className="flex flex-col lg:self-end gap-1 h-full w-full lg:w-2/3">
                        <div className="flex flex-row">
                            <span className="font-extrabold">Most Recent Game ID:&nbsp;</span>
                            <div className="animate-pulse rounded w-10 bg-gray-400"></div>
                        </div>
                        <div className="flex flex-row">
                            <span className="font-extrabold">Most Recent Game Date:&nbsp;</span>
                            <div className="animate-pulse rounded w-20 bg-gray-400"></div>
                        </div>                </div>
                    <div className="flex flex-col w-full lg:w-1/3">
                        <label htmlFor="apiKey" className="font-extrabold">API Key:</label>
                        <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                    </div>
                </div>
            </> : <>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 w-full mt-2 mb-4">
                    <div className="flex flex-col lg:self-end gap-1 h-full w-full lg:w-2/3">
                        <div><span className="font-extrabold">Most Recent Game ID: </span>{mostRecentGame!.GameId}</div>
                        <div><span className="font-extrabold">Most Recent Game Date: </span>{dayjs(mostRecentGame!.GameDate).format("MM/DD/YYYY")}</div>
                    </div>
                    <div className="flex flex-col w-full lg:w-1/3">
                        <label htmlFor="apiKey" className="font-extrabold">API Key:</label>
                        <TextField
                            id="apiKey"
                            placeholder="Enter an API Key"
                            type="password"
                            onChange={e => setApiKey(e.target.value)}
                            onBlur={() => setIsDirty(true)}
                            required
                            disabled={loadingState}
                            error={apiKey === "" && isDirty}
                            className="px-3 py-1"
                            sx={{
                                "div": { "minHeight": "48px", "maxHeight": "48px" },
                                ".MuiInputBase-root": { "backgroundColor": inputBackgroundColor },
                                ".Mui-error": { "color": "#9E0812", "fontSize": "1rem" },
                                ".MuiInputBase-input": { "color": inputTextColor }
                            }}
                        />
                    </div>
                </div>
            </>
        }
        <div className="flex flex-col xl:flex-row w-full">
            <div className="w-full pr-6 pb-4">
                {
                    loadingState ?
                        <AddPreviousGameLoadingContainer /> :
                        <AddPreviousGameContainer
                            possibleWordsState={{ possibleWords, setPossibleWords }}
                            letterRankingState={{ letterRanking, setLetterRanking }}
                            previousGameState={{ previousGames, setPreviousGames }}
                            apiKey={{ apiKey, setApiKey }}
                            mostRecentGameState={{ mostRecentGame, setMostRecentGame }}
                            isDirtyState={{ isDirty, setIsDirty }}
                        />
                }
            </div>
            <div className="w-full pl-6 pb-4">
                {
                    loadingState ?
                        <UpdateScoresLoadingContainer /> :
                        <UpdateScoresContainer
                            possibleWordsState={{ possibleWords, setPossibleWords }}
                            letterRankingState={{ letterRanking, setLetterRanking }}
                            previousGameState={{ previousGames, setPreviousGames }}
                            apiKey={{ apiKey, setApiKey }}
                            mostRecentGameState={{ mostRecentGame, setMostRecentGame }}
                            isDirtyState={{ isDirty, setIsDirty }}
                        />
                }
            </div>
        </div>
    </>;
}