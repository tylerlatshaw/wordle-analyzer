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
export type classColorState = "bg-none" | "bg-w-green" | "bg-w-yellow" | "bg-w-gray";
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