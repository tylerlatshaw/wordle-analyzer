import { classColorState, knownLettersType, letterResponseType, WordType } from "../app/lib/type-library";

export function splitWord(word: string, knownLetters: knownLettersType[]) {
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

export function calculateRecommendedWord(knownLetters: knownLettersType[], remainingWords: WordType[]) {
    const resultSet = remainingWords.sort((a, b) =>
        (a.Score > b.Score) ? -1 : 1
    );

    if (resultSet.length > 0)
        return resultSet[0];
    else
        return null;
}