"use client";

import type { messageParamType } from "../../app/lib/type-library";

 
export default function MessageCenter({ message, setMessage }: messageParamType) {

    return <>
        <div className="flex items-center w-full px-6 py-4 mb-4 rounded-full bg-gray-800 shadow-lg">
            <span className="text-white">
                {message}
            </span>
        </div>
    </>;
}