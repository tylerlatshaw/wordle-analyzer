import { Metadata } from "next/types";
import InputContainer from "../components/homepage/input-container";

export const metadata: Metadata = {
    title: "Home | Wordle Analyzer",
};

export default function Page() {

  return <>
    <div className="h-full mx-4 md:mx-0">
      <div className="main-content container w-full mx-auto flex flex-wrap mx-auto pt-28 md:pt-36 pb-16 md:pb-24">

        <h1 className="w-full px-2 md:pb-8 text-3xl text-black md:text-4xl font-bold text-center">Wordle Word Analyzer</h1>

        <div className="flex flex-row items-center justify-center w-full my-8">
          <div className="flex flex-col items-center justify-center">
            <InputContainer />
          </div>
        </div>

      </div>
    </div>
  </>;
}