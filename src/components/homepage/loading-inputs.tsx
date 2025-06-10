export default function LoadingInput() {

    const row = <>
        <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-gray-300">
            <div className="w-full h-full m-0 p-0"></div>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-gray-300">
            <div className="w-full h-full m-0 p-0"></div>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-gray-300">
            <div className="w-full h-full m-0 p-0"></div>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-gray-300">
            <div className="w-full h-full m-0 p-0"></div>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-gray-300">
            <div className="w-full h-full m-0 p-0"></div>
        </div>
    </>;

    return <>
        <div className="flex items-center w-full px-6 py-4 mb-4 rounded-full bg-gray-800 shadow-lg">
            <span className="text-white">
                &nbsp;
            </span>
        </div>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2 border-2 border-gray-400 rounded-sm animate-pulse bg-[#1975d2]">
                    <div className="w-full h-full m-0 p-0"></div>
                </div>
            </div>
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2"></div>
            </div>
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2"></div>
            </div>
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2"></div>
            </div>
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2"></div>
            </div>
            <div className="flex flex-row items-center">
                {row}
                <div className="w-12 h-12 md:w-16 md:h-16 m-1 md:m-2"></div>
            </div>
        </div>
    </>;
}