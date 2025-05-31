import { alphabet } from "@/app/lib/alphabet";
import { classColorState, formHandlerPropsType, KnownLettersType, letterResponseType, WordType } from "../app/lib/type-library";

export function splitWord(word: string, knownLetters: KnownLettersType[]) {
    const letterResponse: letterResponseType[] = [];
    const backgroundClass: classColorState[] = [];
    const array = word.split("");
    array!.map((value, index) => {
        if (word.charAt(index) === knownLetters[index].CorrectLetter) {
            letterResponse.push(
                {
                    index: index,
                    letter: value,
                    response: "correct"
                }
            );
            backgroundClass.push("bg-green-500");
        } else if (knownLetters[index].MisplacedLetters.includes(word.charAt(index))) {
            letterResponse.push(
                {
                    index: index,
                    letter: value,
                    response: "misplaced"
                }
            );
            backgroundClass.push("bg-yellow-400");
        } else {
            letterResponse.push(
                {
                    index: index,
                    letter: value,
                    response: "incorrect"
                }
            );
            backgroundClass.push("bg-gray-400");
        }
    });

    return { letterResponse, backgroundClass };
}

export function calculateRecommendedWord(knownLetters: KnownLettersType[], remainingWords: WordType[]) {
    const resultSet = remainingWords.sort((a, b) =>
        (a.Score > b.Score) ? -1 : 1
    );

    if (resultSet.length > 0)
        return resultSet[0];
    else
        return null;
}

export function removeInvalidWords(
    props: formHandlerPropsType,
    letterResponse: letterResponseType[],
): {
    updatedWords: WordType[],
    updatedKnownLetters: KnownLettersType[]
} {

    let updatedWords = [...props.possibleWordsState.possibleWords];
    const updatedKnownLetters = props.knownLettersState.knownLetters.map((item) => ({ ...item }));

    // Step 1: Pre-collect correct letters from this response
    const correctLetters = new Map<number, string>();
    letterResponse.forEach(({ index, letter, response }) => {
        if (response === "correct") {
            correctLetters.set(index, letter.toLowerCase());
        }
    });

    letterResponse.forEach(({ index, letter, response }) => {
        const lowerLetter = letter.toLowerCase();
        const currentLetterState = updatedKnownLetters[index];

        switch (response) {
            case "correct":
                currentLetterState.CorrectLetter = lowerLetter;
                currentLetterState.IncorrectLetters = alphabet.filter(
                    (l) => l.toLowerCase() !== lowerLetter
                );
                updatedWords = updatedWords.filter(
                    (word) => word.Word.charAt(index).toLowerCase() === lowerLetter
                );
                break;

            case "incorrect":
                // Only remove the letter completely if it's not marked as correct/misplaced elsewhere
                const isElsewhereCorrectOrMisplaced = letterResponse.some(
                    (lr) =>
                        lr.letter.toLowerCase() === lowerLetter &&
                        lr.index !== index &&
                        (lr.response === "correct" || lr.response === "misplaced")
                );

                if (!isElsewhereCorrectOrMisplaced) {
                    // Remove all words containing the letter at any position
                    updatedWords = updatedWords.filter(
                        (word) => !word.Word.toLowerCase().includes(lowerLetter)
                    );
                } else {
                    // Only remove words with that letter at this index
                    updatedWords = updatedWords.filter(
                        (word) => word.Word.charAt(index).toLowerCase() !== lowerLetter
                    );
                }

                currentLetterState.IncorrectLetters.push(lowerLetter);
                currentLetterState.UnsetLetters = currentLetterState.UnsetLetters.filter(
                    (l) => l.toLowerCase() !== lowerLetter
                );
                break;

            case "misplaced":
                if (!currentLetterState.MisplacedLetters.includes(lowerLetter)) {
                    currentLetterState.MisplacedLetters.push(lowerLetter);
                }

                currentLetterState.UnsetLetters = currentLetterState.UnsetLetters.filter(
                    (l) => l.toLowerCase() !== lowerLetter
                );

                updatedWords = updatedWords.filter((word) => {
                    const wordLower = word.Word.toLowerCase();

                    // Must not be at the given index
                    if (wordLower.charAt(index) === lowerLetter) return false;

                    // Must appear elsewhere in the word
                    for (let i = 0; i < wordLower.length; i++) {
                        if (
                            i !== index &&
                            wordLower[i] === lowerLetter &&
                            correctLetters.get(i) !== lowerLetter // make sure we don't reuse a correct spot
                        ) {
                            return true;
                        }
                    }

                    return false;
                });

                break;

            default:
                break;
        }
    });

    props.knownLettersState.setKnownLetters(updatedKnownLetters);
    props.possibleWordsState.setPossibleWords(updatedWords);

    return { updatedKnownLetters, updatedWords };
}