"use client";

import { LetterRankingType, PreviousGameType, WordType } from "@/app/lib/type-library";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddPreviousGameContainer } from "./add-previous-game-container";
import { UtilityButtons } from "./button-container";

export function UtilityContainer() {

    const [possibleWords, setPossibleWords] = useState<WordType[]>([]);
    const [letterRanking, setLetterRanking] = useState<LetterRankingType[]>([]);
    const [previousGames, setPreviousGames] = useState<PreviousGameType[]>([]);
    const [loadingState, setLoadingState] = useState<boolean>(true);

    useEffect(() => {
        try {
            Promise.all([
                axios.get("/api/get-possible-words").then((response) => {
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
        <div className="flex flex-row gap-8">
            <div>
                {
                    loadingState ?
                        <div>Loading...</div> :
                        <AddPreviousGameContainer
                            possibleWordsState={{ possibleWords, setPossibleWords }}
                            letterRankingState={{ letterRanking, setLetterRanking }}
                            previousGameState={{ previousGames, setPreviousGames }}
                        />
                }
            </div>
            {/* <div>
                <UtilityButtons />
            </div> */}
        </div>
    </>;
}