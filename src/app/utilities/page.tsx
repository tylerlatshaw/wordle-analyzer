import { UtilityContainer } from "@/components/utilities/utility-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utilities",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {

  return <>
    <div className="h-full mx-4 md:mx-0">
      <div className="main-content container w-full mx-auto flex flex-wrap mx-auto pt-28 md:pt-36 pb-16 md:pb-24">

        <h1 className="w-full pb-8 text-3xl text-black md:text-4xl font-bold text-center">Utilities</h1>

        <div className="flex flex-row items-center justify-center w-full my-8 px-4">
          <div className="flex flex-col items-center justify-center">

            <UtilityContainer />

          </div>
        </div>

      </div>
    </div>
  </>;
}