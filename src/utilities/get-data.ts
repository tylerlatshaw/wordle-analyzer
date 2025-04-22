
import { WordType } from "@/app/lib/type-library";

const baseUrl = process.env.BASE_URL;

const getPossibleWords = async (): Promise<WordType[]> => {
    const data = await fetch(baseUrl + "/api/get-possible-words");

    return data.json();
};

export default getPossibleWords;