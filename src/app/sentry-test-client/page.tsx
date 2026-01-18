"use client";

export default function SentryClientTestPage() {
    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">

                <h1>Sentry Test Client</h1>

                <div className="flex flex-row w-full justify-center items-center my-16">
                    <button
                        className="bg-red-800 hover:red-900 rounded-lg px-5 py-3"
                        onClick={() => {
                            throw new Error("Sentry client-side smoke test (intentional)");
                        }}
                    >
                        Trigger Client Error
                    </button>
                </div>

            </div>
        </div>
    </>;
}