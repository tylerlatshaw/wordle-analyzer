import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";

export default function NoDataFound(modifier: string) {
    return (
        <div className="flex flex-col justify-center w-full text-gray-400 m-4">
            <div className="flex w-full justify-center">
                <FolderOffOutlinedIcon fontSize="large" className="flex w-full justify-center" />
            </div>
            <div className="flex w-full pt-2">
                <span className="flex justify-center w-full text-xl font-semibold">No {modifier} Found</span>
            </div>
        </div>
    );
}