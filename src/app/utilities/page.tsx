import { splitWord } from "@/utilities/calculate-scores";
import getPossibleWords from "@/utilities/get-data";

export default async function Page() {

    const data = await getPossibleWords();

    function text() {
        const array = splitWord(data[0].Word);

        const html = array.map((letter) => {
            return <div key={letter}>
                {letter}
            </div>;
        });

        return array;
    }
    
    return <>
        <div className="h-full mx-4 md:mx-0">
            <div className="main-content container w-full mx-auto flex flex-wrap mx-auto pt-28 md:pt-36 pb-16 md:pb-24">

                <h1 className="w-full pb-8 text-3xl text-black md:text-4xl font-bold text-center">Wordle Word Analyzer</h1>

                <div className="flex flex-row items-center justify-center w-full my-8">
                    <div className="flex flex-col items-center justify-center">
                        
                        {
                            text()
                        }

                    </div>
                </div>
            </div>
        </div>
    </>;
}