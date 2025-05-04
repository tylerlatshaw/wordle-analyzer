import PrivacyPolicy from "../../components/privacy-policy/privacy-policy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function Page() {
    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1 className="w-full pb-8 text-3xl text-black md:text-4xl font-bold text-center">Privacy Policy</h1>

                <PrivacyPolicy />

            </div>
        </div>
    </>;
}