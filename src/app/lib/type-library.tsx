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

export type ApiKeyState = {
    apiKey: string,
    setApiKey: Dispatch<SetStateAction<string>>
}

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

export type possibleWordState = {
    possibleWords: WordType[],
    setPossibleWords: Dispatch<SetStateAction<WordType[]>>
}

export type knownLettersState = {
    knownLetters: KnownLettersType[],
    setKnownLetters: Dispatch<SetStateAction<KnownLettersType[]>>
}

export type formHandlerPropsType = {
    messageState: messageParamType,
    wordCountState: wordCountParamType,
    gamePlayState: gamePlayState,
    possibleWordsState: possibleWordState,
    knownLettersState: knownLettersState
}

export type isDirtyState = {
    isDirty: boolean,
    setIsDirty: Dispatch<SetStateAction<boolean>>
}

export type KnownLettersType = {
    CorrectLetter: string,
    MisplacedLetters: string[],
    IncorrectLetters: string[],
    UnsetLetters: string[]
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

export type LetterRankingType = {
    LetterId: number,
    Letter: string,
    Position: number,
    Score: number
}

export type LetterRankingInputType = {
    ApiKey: string,
    LetterRanking: LetterRankingType[],
}

export type letterRankingState = {
    letterRanking: LetterRankingType[],
    setLetterRanking: Dispatch<SetStateAction<LetterRankingType[]>>
}

export type mostRecentGameState = {
    mostRecentGame: PreviousGameType | undefined,
    setMostRecentGame: Dispatch<SetStateAction<PreviousGameType | undefined>>
}

export type PreviousGameInputType = {
    ApiKey: string,
    GameData: {
        GameId: number | undefined,
        GameDate: string,
        Word: string
    }[]
}

export type PreviousGameType = {
    Id?: number,
    GameId: number,
    GameDate: Dayjs | string,
    Word: WordType | string
}

export type previousGameState = {
    previousGames: PreviousGameType[],
    setPreviousGames: Dispatch<SetStateAction<PreviousGameType[]>>
}

export type RecommendedWordType = string | undefined

export type UtilityPropsType = {
    possibleWordsState: possibleWordState,
    letterRankingState: letterRankingState,
    previousGameState: previousGameState,
    apiKey: ApiKeyState,
    mostRecentGameState: mostRecentGameState
    isDirtyState: isDirtyState
}

export type WordRankingInputType = {
    ApiKey: string,
    WordRanking: WordType[],
}

export type WordType = {
    WordleWordId: number,
    Word: string,
    Score: number
}