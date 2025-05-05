"use client";

import { LetterRankingType, WordType } from "@/app/lib/type-library";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export function UtilityButtons() {

    const [possibleWords, setPossibleWords] = useState<WordType[]>([]);
    const [letterRanking, setLetterRanking] = useState<LetterRankingType[]>([]);
    const [wordsCalculated, setWordsCalculated] = useState<boolean>(false);
    const [lettersCalculated, setLettersCalculated] = useState<boolean>(false);

    useEffect(() => {
        try {
            axios.get("/api/get-possible-words").then((response) => {
                setPossibleWords(response.data);
            });

            axios.get("/api/get-letter-ranking").then((response) => {
                setLetterRanking(response.data);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    function calculateLetterRanking() {
        const wordCount = possibleWords.length;
        const tempArray: LetterRankingType[] = [];

        letterRanking.forEach((letter) => {
            const lowerLetter = letter.Letter.toLowerCase();
            const matchedWords = possibleWords.filter((word) =>
                word.Word.charAt(letter.Position - 1).toLowerCase() === lowerLetter
            );
            const positionScore = matchedWords.length / wordCount;
            tempArray.push({
                LetterId: letter.LetterId,
                Letter: letter.Letter,
                Position: letter.Position,
                Score: positionScore * 100
            });
        });

        setLetterRanking(tempArray);
        setLettersCalculated(true);

        return tempArray;
    }

    function calculateWordRanking() {
        let updatedLetterRanking: LetterRankingType[] = [];
        if (lettersCalculated) {
            updatedLetterRanking = letterRanking;
        } else {
            updatedLetterRanking = calculateLetterRanking();
        }

        const tempArray: WordType[] = [];
        possibleWords.forEach((word) => {
            const splitWord = word.Word.split("");
            let wordScore = 0;
            splitWord.forEach((splitLetter, index) => {
                wordScore += updatedLetterRanking.find((ranking) => {
                    return ranking.Letter.toLowerCase() === splitLetter.toLowerCase() && ranking.Position === index + 1;
                })!.Score;
            });
            tempArray.push({
                WordleWordId: word.WordleWordId,
                Word: word.Word,
                Score: wordScore
            });
        });

        setPossibleWords(tempArray);
        setWordsCalculated(true);
    }

    async function saveLetterRankings() {
        const toastMessage = toast.loading("Saving letter ranking");
        try {
            const response = await axios.post("api/set-letter-rankings", { letterRanking });

            if (response.status === 200) {
                const message = response.data.length + " letters updated";
                toast.update(toastMessage, { render: message, type: "success", isLoading: false, autoClose: 4000 });
            } else {
                toast.update(toastMessage, { render: "Something went wrong. Please try again later.", type: "error", isLoading: false, autoClose: 4000 });
            }
        } catch (e) {
            toast.update(toastMessage, { render: "Something went wrong. Please try again later.", type: "error", isLoading: false, autoClose: 4000 });
            console.log("An error occured when updating the data: " + e);
        }
    }

    async function saveWordRankings() {
        const toastMessage = toast.loading("Saving word scores");
        try {
            const response = await axios.post("api/set-word-scores", { possibleWords });

            if (response.status === 200) {
                const message = response.data.length + " words updated";
                toast.update(toastMessage, { render: message, type: "success", isLoading: false, autoClose: 4000 });
            } else {
                toast.update(toastMessage, { render: "Something went wrong. Please try again later.", type: "error", isLoading: false, autoClose: 4000 });
            }
        } catch (e) {
            toast.update(toastMessage, { render: "Something went wrong. Please try again later.", type: "error", isLoading: false, autoClose: 4000 });
            console.log("An error occured when updating the data: " + e);
        }
    }

    return <>
        <table className="utilities-table table-auto">
            <thead className="bg-slate-500 text-white">
                <tr>
                    <th>Calculate Values</th>
                    <th>Commit to Database</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Button variant="contained" onClick={() => { calculateLetterRanking(); }}>Calculate Letter Rankings</Button>
                    </td>
                    <td>
                        <Button variant="contained" color="success" onClick={() => { saveLetterRankings(); }} disabled={!lettersCalculated}>Save New Letter Rankings</Button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button variant="contained" onClick={() => { calculateWordRanking(); }}>Calculate Word Rankings</Button>
                    </td>
                    <td>
                        <Button variant="contained" color="success" onClick={() => { saveWordRankings(); }} disabled={!wordsCalculated}>Save New Word Scores</Button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ToastContainer />
    </>;
}