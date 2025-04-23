"use client";

import { letterResponseType } from "../app/lib/type-library";

export function splitWord(word: string) {
    const letterResponse: letterResponseType[] = [];
    const array = word.split("");
    array!.map((value, index) => {
        letterResponse.push(
            {
                index: index,
                letter: value,
                response: "incorrect"
            }
        );
    });

    return letterResponse;
}