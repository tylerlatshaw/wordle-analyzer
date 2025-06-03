"use client";

import { LetterRankingType, PreviousGameType, WordType } from "@/app/lib/type-library";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddPreviousGameContainer } from "./add-previous-game-container";
import { UpdateScoresContainer } from "./update-scores-container";
import { AddPreviousGameLoadingContainer } from "./add-previous-game-loading-container";
import { UpdateScoresLoadingContainer } from "./update-scores-loading-container";

export function UtilityContainer() {

    const [possibleWords, setPossibleWords] = useState<WordType[]>([]);
    const [letterRanking, setLetterRanking] = useState<LetterRankingType[]>([]);
    const [previousGames, setPreviousGames] = useState<PreviousGameType[]>([]);
    const [loadingState, setLoadingState] = useState<boolean>(true);

    useEffect(() => {
        try {
            Promise.all([
                axios.get("/api/get-all-words").then((response) => {
                    setPossibleWords(response.data);
                }),
                axios.get("/api/get-letter-ranking").then((response) => {
                    setLetterRanking(response.data);
                }),
                axios.get("/api/get-previous-words").then((response) => {
                    setPreviousGames(response.data);
                })
            ]).then(() =>
                setLoadingState(false)
            );
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    return <>
        <div className="flex flex-col xl:flex-row w-full xl:divide xl:divide-x-2 xl:divide-gray-200">
            <div className="w-full pr-6 pb-4">
                {
                    loadingState ?
                        <AddPreviousGameLoadingContainer /> :
                        <AddPreviousGameContainer
                            possibleWordsState={{ possibleWords, setPossibleWords }}
                            letterRankingState={{ letterRanking, setLetterRanking }}
                            previousGameState={{ previousGames, setPreviousGames }}
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
                        />
                }
            </div>
        </div>
    </>;
}