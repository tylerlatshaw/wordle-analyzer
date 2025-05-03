"use client";

import { useState } from "react";
import { Button, styled } from "@mui/material";
import OtpInput from "react-otp-input";
import CheckIcon from "@mui/icons-material/Check";
import { calculateRecommendedWord, splitWord } from "@/utilities/word-processing";
import { emojiBlast } from "emoji-blast";
import type { classColorState, formHandlerPropsType, inputState, letterResponseType, RecommendedWordType } from "../../app/lib/type-library";
import { alphabet } from "@/app/lib/alphabet";


export default function FormHandler(props: formHandlerPropsType) {
    const [word, setWord] = useState("");
    const [inputState, setInputState] = useState<inputState>("input");
    const [letterResponse, setLetterResponse] = useState<letterResponseType[]>([]);
    const [backgroundClass, setBackgroundClass] = useState<classColorState[]>(["bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400", "bg-gray-400"]);

    const SubmitButton = styled(Button)({
        color: "white",
        margin: "8px"
    });

    function removeInvalidLetters() {

        let updatedWords = [...props.possibleWordsState.possibleWords];
        const updatedKnownLetters = props.knownLettersState.knownLetters.map((item) => ({ ...item }));

        letterResponse.forEach((letter) => {
            const index = letter.index;
            const currentLetterState = updatedKnownLetters[index];

            if (props.knownLettersState.knownLetters[letter.index].CorrectLetter === "") {
                const lowerLetter = letter.letter.toLowerCase();

                if (letter.response === "correct") {
                    // Mark the letter as correct at this index
                    currentLetterState.CorrectLetter = lowerLetter;

                    // Update incorrect letters to exclude this correct one
                    currentLetterState.IncorrectLetters = alphabet.filter(
                        (element) => element.toLowerCase() !== lowerLetter
                    );

                    // Filter the possible words to keep only those that have this correct letter at this position
                    updatedWords = updatedWords.filter(
                        (word) => word.Word.charAt(index).toLowerCase() === lowerLetter
                    );
                } else if (letter.response === "misplaced") {
                    // Get the current state object for the letter at the given index
                    const currentLetterState = updatedKnownLetters[index];

                    // If this letter hasn't already been marked as misplaced at this position, add it
                    if (!currentLetterState.MisplacedLetters.includes(letter.letter)) {
                        currentLetterState.MisplacedLetters.push(letter.letter);
                    }

                    // Remove this letter from the unset list, since we've now classified it
                    currentLetterState.UnsetLetters = currentLetterState.UnsetLetters.filter(
                        (l) => l.toLowerCase() !== lowerLetter
                    );

                    // Filter the possible words:
                    // - The letter must NOT appear at this index (since it's misplaced)
                    // - The letter must appear somewhere else in the word
                    // - The letter at this index must not already be marked as a "correct" letter
                    updatedWords = updatedWords.filter((word) => {
                        const wordLower = word.Word.toLowerCase();
                        return (
                            wordLower.charAt(index) !== lowerLetter &&
                            wordLower.includes(lowerLetter) &&
                            currentLetterState.CorrectLetter === ""
                        );
                    });
                } else if (letter.response === "incorrect") {
                    // Add the letter to the list of known incorrect letters for this index
                    currentLetterState.IncorrectLetters = [
                        ...currentLetterState.IncorrectLetters,
                        letter.letter,
                    ];

                    // Remove it from the unset list, since we now know it's incorrect
                    currentLetterState.UnsetLetters = currentLetterState.UnsetLetters.filter(
                        (l) => l.toLowerCase() !== lowerLetter
                    );

                    // Filter the possible words to exclude any word that has this letter at this index
                    updatedWords = updatedWords.filter(
                        (word) => word.Word.charAt(index).toLowerCase() !== lowerLetter
                    );
                }
            }
        });

        props.knownLettersState.setKnownLetters(updatedKnownLetters);
        props.possibleWordsState.setPossibleWords(updatedWords);

        return { updatedKnownLetters, updatedWords };
    }

    function handleInputSubmit() {
        if (word.length === 5) {
            const { letterResponse, backgroundClass } = splitWord(word, props.knownLettersState.knownLetters);
            setLetterResponse(letterResponse);
            setBackgroundClass(backgroundClass);
            setInputState("button");
            props.messageState.setMessage("Click each letter to set if you were correct");
        } else {
            props.messageState.setMessage("Please enter enough letters");
        }
    }

    function handleButtonClick(index: number) {
        const tempArray: letterResponseType[] = letterResponse;

        if (letterResponse[index].response === "unset") {
            tempArray[index].response = "incorrect";
            setLetterResponse(tempArray);

            const items = backgroundClass.slice();
            items[index] = "bg-gray-400";
            setBackgroundClass(items);
        } else if (letterResponse[index].response === "incorrect") {
            tempArray[index].response = "misplaced";
            setLetterResponse(tempArray);

            const items = backgroundClass.slice();
            items[index] = "bg-yellow-400";
            setBackgroundClass(items);
        } else if (letterResponse[index].response === "misplaced") {
            tempArray[index].response = "correct";
            setLetterResponse(tempArray);

            const items = backgroundClass.slice();
            items[index] = "bg-green-500";
            setBackgroundClass(items);
        } else {
            tempArray[index].response = "incorrect";
            setLetterResponse(tempArray);

            const items = backgroundClass.slice();
            items[index] = "bg-gray-400";
            setBackgroundClass(items);
        }
    }

    function handleButtonSubmit() {
        if (!letterResponse.some(letter => letter.response === "unset")) {
            setInputState("readOnly");
            calculateWin();
        } else {
            props.messageState.setMessage("Please set all letters first");
        }
    }

    function calculateWin() {
        if (letterResponse.some(letter => letter.response === "incorrect" || letter.response === "misplaced")) { // Not a win yet
            if (props.wordCountState.wordCount < 6) {
                removeInvalidLetters();
                const { updatedKnownLetters, updatedWords } = removeInvalidLetters(); // refactor to return the filtered array
                const recommendedWord: RecommendedWordType = calculateRecommendedWord(updatedKnownLetters, updatedWords)?.Word;

                if (recommendedWord === undefined)
                    props.messageState.setMessage("Please enter a word. We don't have one to recommend.");
                else
                    props.messageState.setMessage("Please enter a word. We recommend: " + recommendedWord);
                props.wordCountState.setWordCount(props.wordCountState.wordCount + 1);
            } else {
                props.gamePlayState.setGameState("lost");
                props.messageState.setMessage("Sorry, you lost. 🙁");
            }
        } else {
            props.gamePlayState.setGameState("won");
            props.messageState.setMessage("You won in " + props.wordCountState.wordCount + "! 🎉");
            const element = document.getElementsByTagName("h1");
            emojiBlast({
                emojis: ["🎉"],
                position() {
                    return {
                        x: element[0].offsetLeft + element[0].clientWidth / 2,
                        y: element[0].offsetTop + element[0].clientHeight / 2,
                    };
                },
                physics: {
                    fontSize: { max: 56, min: 32 }
                },
            });
        }
    }

    if (inputState === "input") {
        return <div className="otp-container flex flex-row">
            <div onKeyDown={(e) => e.key === "Enter" ? handleInputSubmit() : null}>
                <OtpInput
                    value={word}
                    onChange={setWord}
                    numInputs={5}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={"text-5xl"}
                    inputStyle={"w-16 h-16 m-2 border-2 border-gray-400 rounded-sm uppercase"}
                />
            </div>
            <SubmitButton className="w-12 h-16 m-2" variant="contained" onClick={() => { handleInputSubmit(); }}>
                <CheckIcon />
            </SubmitButton>
        </div>;
    } else if (inputState === "button") {
        return <div className="flex flex-row items-center">
            {
                letterResponse.map((value) => (
                    <div key={value.index} className="w-16 h-16 m-2 border-2 border-gray-400 rounded-sm uppercase text-black text-5xl">
                        <button className={"w-full h-full m-0 p-0 px-1 cursor-pointer uppercase " + backgroundClass[value.index]} value={value.index} onClick={() => { handleButtonClick(value.index); }}>
                            {value.letter}
                        </button>
                    </div>
                ))
            }
            <SubmitButton className="w-12 h-16 m-2 rounded-full bg-green-500 hover:bg-green-700 text-white" variant="contained" onClick={() => { handleButtonSubmit(); }}>
                <CheckIcon />
            </SubmitButton>
        </div>;
    } else {
        return <div className="flex flex-row items-center">
            {
                letterResponse.map((value) => (
                    <div key={value.index} className="w-16 h-16 m-2 border-2 border-gray-400 rounded-sm uppercase text-black text-5xl">
                        <div className={"w-full h-full m-0 p-0 px-1 flex items-center justify-center uppercase " + backgroundClass[value.index]}>
                            {value.letter}
                        </div>
                    </div>
                ))
            }
            <div className="w-16 h-16 m-2"></div>
        </div>;
    }
}