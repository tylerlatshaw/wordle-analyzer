"use client";

import { LetterRankingInputType, LetterRankingType, UtilityPropsType, WordRankingInputType, WordType } from "@/app/lib/type-library";
import { Button, ButtonProps, CircularProgress, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";

type SubmitState = "Idle" | "Success" | "Error";

export function UpdateScoresContainer(props: UtilityPropsType) {

    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState("");

    const saveLetterRanking = async () => {

        setLoadingState(true);

        const updatedLetterRanking = calculateLetterRanking();

        const formData: LetterRankingInputType = {
            ApiKey: apiKey,
            LetterRanking: updatedLetterRanking
        };

        try {
            const { data } = await axios.post("/api/set-letter-rankings", {
                LetterRanking: formData.LetterRanking
            } as LetterRankingInputType, {
                headers: {
                    "x-api-key": formData.ApiKey
                }
            });

            const updatedValues = data.letterRanking;

            if (updatedValues.length > 0) {
                props.letterRankingState.setLetterRanking(updatedValues);
                setSubmitState("Success");
                setResponseMessage(updatedValues.length + " letters updated!");
            } else {
                setSubmitState("Error");
                setResponseMessage("An error occurred. Please try again later.");
            }
        } catch (e) {
            const error = e as AxiosError;
            const errorMessage = error.response?.data as unknown as { error: string };
            setResponseMessage(errorMessage.error);
            setSubmitState("Error");
            console.log("An error occurred: " + e);
        }

        setLoadingState(false);
    };

    const calculateLetterRanking = () => {
        const wordCount = props.possibleWordsState.possibleWords.length;
        const tempArray: LetterRankingType[] = [];

        props.letterRankingState.letterRanking.forEach((letter) => {
            const lowerLetter = letter.Letter.toLowerCase();
            const matchedWords = props.possibleWordsState.possibleWords.filter((word) =>
                word.Word.charAt(letter.Position).toLowerCase() === lowerLetter
            );
            const positionScore = matchedWords.length / wordCount;
            tempArray.push({
                LetterId: letter.LetterId,
                Letter: letter.Letter,
                Position: letter.Position,
                Score: positionScore * 100
            });
        });

        return tempArray;
    };

    const saveWordRanking = async () => {

        setLoadingState(true);

        const updatedWordRanking = calculateWordRanking();

        const formData: WordRankingInputType = {
            ApiKey: apiKey,
            WordRanking: updatedWordRanking
        };

        try {
            const { data } = await axios.post("/api/set-word-scores", {
                WordRanking: formData.WordRanking
            } as WordRankingInputType, {
                headers: {
                    "x-api-key": formData.ApiKey
                }
            });

            const updatedValues = data.wordRanking;

            if (updatedValues.length > 0) {
                props.possibleWordsState.setPossibleWords(updatedValues);
                setSubmitState("Success");
                setResponseMessage(updatedValues.length + " words updated!");
            } else {
                setSubmitState("Error");
                setResponseMessage("An error occurred. Please try again later.");
            }
        } catch (e) {
            const error = e as AxiosError;
            const errorMessage = error.response?.data as unknown as { error: string };
            setResponseMessage(errorMessage.error);
            setSubmitState("Error");
            console.log("An error occurred: " + e);
        }

        setLoadingState(false);
    };

    const calculateWordRanking = () => {
        const tempArray: WordType[] = [];

        props.possibleWordsState.possibleWords.forEach((word) => {
            const splitWord = word.Word.split("");
            let newScore = 0;

            splitWord.forEach((letter, index) => {
                const foundLetterScore = props.letterRankingState.letterRanking.find((rank) => {
                    return rank.Letter.toLowerCase() === letter.toLowerCase() && rank.Position === index;
                });
                if (foundLetterScore !== undefined)
                    newScore += foundLetterScore.Score;
            });

            tempArray.push({
                WordleWordId: word.WordleWordId,
                Word: word.Word,
                Score: newScore
            });
        });

        return tempArray;
    };

    function GetResponseCssClass() {
        if (submitState === "Success") {
            return "positive-response";
        }

        if (submitState === "Error") {
            return "negative-response";
        }

        return "";
    }

    const ActionButton = styled(Button)<ButtonProps>(() => ({
        minHeight: "48px",
        maxHeight: "48px",
        paddingLeft: "14px",
        paddingRight: "14px",
        color: "white",
        backgroundColor: "#00A53D",
        "&:hover": {
            backgroundColor: "#008236",
        },
        "&:disabled": {
            color: "white",
            backgroundColor: "#008236",
            cursor: "not-allowed"
        },
    }));

    return <>
        <h2 className="mt-1">Update Scores</h2>

        <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row justify-between w-full mt-2 mb-4">
                <div className="flex flex-col w-full">
                    <label htmlFor="apiKey" className="font-extrabold">API Key:</label>
                    <TextField
                        placeholder="Enter an API Key"
                        type="password"
                        value={apiKey}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setApiKey(event.target.value);
                        }}
                        required
                        className={"bg-slate-100 px-3 py-1"}
                        sx={{ "div": { "minHeight": "48px", "maxHeight": "48px" } }}
                    />
                </div>
            </div>
            <TableContainer className="w-full border border-2 border-gray-400 rounded-lg shadow">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell>Database Values</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ "td": { border: 0 }, "& > :not(:last-child)": { borderBottomWidth: "1px", borderColor: "#E4E7EB" } }}>
                        <TableRow>
                            <TableCell>
                                <span className="text-base">Letter Rankings</span>
                            </TableCell>
                            <TableCell>
                                <ActionButton onClick={() => { saveLetterRanking(); }} disabled={loadingState}>
                                    <span className="flex items-center">
                                        {loadingState ? <>Calculate and Save&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Calculate and Save&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                                    </span>
                                </ActionButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span className="text-base">Word Scores</span>
                            </TableCell>
                            <TableCell>
                                <ActionButton onClick={() => { saveWordRanking(); }} disabled={loadingState}>
                                    <span className="flex items-center">
                                        {loadingState ? <>Calculate and Save&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Calculate and Save&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                                    </span>
                                </ActionButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <p className={`w-full max-w-full pl-3 text-md wrap-normal break-normal  ${GetResponseCssClass()}`}>{responseMessage}</p>
        </div>
    </>;
}