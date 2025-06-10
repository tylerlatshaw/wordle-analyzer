"use client";

import { useEffect, useState } from "react";
import { gameState, KnownLettersType, WordType } from "../../app/lib/type-library";
import axios from "axios";
import { alphabet } from "../../app/lib/alphabet";
import FormHandler from "./form-handler";
import EmptyInput from "./empty-input";
import MessageCenter from "./message-center";
import LoadingInput from "./loading-inputs";

export default function InputContainer() {
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState("Please enter a word");
    const [wordCount, setWordCount] = useState(1);
    const [gameState, setGameState] = useState<gameState>("playing");
    const [possibleWords, setPossibleWords] = useState<WordType[]>([]);
    const [knownLetters, setKnownLetters] = useState<KnownLettersType[]>([
        {
            UnsetLetters: alphabet,
            CorrectLetter: "",
            IncorrectLetters: [],
            MisplacedLetters: []
        },
        {
            UnsetLetters: alphabet,
            CorrectLetter: "",
            IncorrectLetters: [],
            MisplacedLetters: []
        },
        {
            UnsetLetters: alphabet,
            CorrectLetter: "",
            IncorrectLetters: [],
            MisplacedLetters: []
        },
        {
            UnsetLetters: alphabet,
            CorrectLetter: "",
            IncorrectLetters: [],
            MisplacedLetters: []
        },
        {
            UnsetLetters: alphabet,
            CorrectLetter: "",
            IncorrectLetters: [],
            MisplacedLetters: []
        }]);

    useEffect(() => {
        try {
            axios.get("/api/get-possible-words").then((response) => {
                setPossibleWords(response.data);
                setLoading(false);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    const inputRows = <>
        <MessageCenter message={message} setMessage={setMessage} />
        <div className={"disable-tap-zoom flex flex-col items-center justify-center "} style={gameState !== "playing" ? { "animation": "move-right-16 1s ease 0s 1 normal forwards" } : {}}>
            <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} />
            {
                wordCount >= 2 ?
                    <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} /> :
                    <EmptyInput />
            }
            {
                wordCount >= 3 ?
                    <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} /> :
                    <EmptyInput />
            }
            {
                wordCount >= 4 ?
                    <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} /> :
                    <EmptyInput />
            }
            {
                wordCount >= 5 ?
                    <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} /> :
                    <EmptyInput />
            }
            {
                wordCount >= 6 ?
                    <FormHandler messageState={{ message, setMessage }} wordCountState={{ wordCount, setWordCount }} gamePlayState={{ gameState, setGameState }} possibleWordsState={{ possibleWords, setPossibleWords }} knownLettersState={{ knownLetters, setKnownLetters }} /> :
                    <EmptyInput />
            }
        </div>
    </>;

    return loading ? <LoadingInput /> : inputRows;
}