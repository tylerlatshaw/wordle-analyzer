import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";

export type FooterSocialType = {
    display: string,
    link: string,
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">>
}

export type inputState = "input" | "button" | "readOnly";
export type submitState = "ineligible" | "eligible" | "submitted";
export type letterResponseState = "unset" | "correct" | "incorrect" | "misplaced";
export type classColorState = "bg-none" | "bg-green-500" | "bg-yellow-400" | "bg-gray-400";
export type gameState = "playing" | "won" | "lost";

export type letterResponseType = {
    index: number,
    letter: string,
    response: letterResponseState | null
}

export type messageParamType = {
    message: string,
    setMessage: Dispatch<SetStateAction<string>>
}

export type wordCountParamType = {
    wordCount: number,
    setWordCount: Dispatch<SetStateAction<number>>
}

export type gamePlayState = {
    gameState: gameState,
    setGameState: Dispatch<SetStateAction<gameState>>
}

export type formHandlePropsType = {
    messageState: messageParamType,
    wordCountState: wordCountParamType,
    gamePlayState: gamePlayState
}

export type LetterRankingType = {
    LetterId: number,
    Letter: string,
    Position: number,
    Score: number
}

export type LetterRankingByGroupType = {
    Letter: string,
    Scores: {
        Position1: number,
        Position2: number,
        Position3: number,
        Position4: number,
        Position5: number,
    }
}

export type PreviousGameType = {
    GameId: number,
    GameDate: Dayjs | string,
    Word: WordType
}

export type WordType = {
    WordleWordId: number,
    Word: string,
    Score: number
}