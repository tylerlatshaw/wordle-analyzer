import DataTable from "../../components/letter-ranking/data-table";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Letter Rankings",
};

export default function Page() {

    return <>
        <div className="h-full mx-4 md:mx-0">
            <div className="main-content container w-full mx-auto flex justify-center flex-wrap mx-auto pt-28 md:pt-36 pb-16 md:pb-24">

                <h1 className="w-full pb-8 text-3xl text-black md:text-4xl font-bold text-center">Letter Rankings</h1>

                <div className="w-full sm:w-2/3 md:w-2/5 lg:1/4 mx-8">
                    <p className="w-full mx-auto text-center">Below is a list of all letters for each position in a word (1 - 5), and its score relative to all possible words. The higher the score, the more likely that letter will be in a word for that position.</p>
                </div>

                <DataTable />
            </div>
        </div>
    </>;
}