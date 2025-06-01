import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export function AddPreviousGameLoadingContainer() {

    const fields = [1, 2, 3, 4, 5];

    return (<>
        <h2>Add Previous Games</h2>

        <div className="flex flex-col gap-3 w-full lg:w-[827px]">
            <div className="flex flex-row justify-between w-full mt-2 mb-4">
                <div className="flex flex-col self-end gap-1 h-full w-2/3">
                    <div className="flex flex-row">
                        <span className="font-extrabold">Most Recent Game ID:&nbsp;</span>
                        <div className="animate-pulse rounded w-10 bg-gray-400"></div>
                    </div>
                    <div className="flex flex-row">
                        <span className="font-extrabold">Most Recent Game Date:&nbsp;</span>
                        <div className="animate-pulse rounded w-20 bg-gray-400"></div>
                    </div>                </div>
                <div className="flex flex-col w-1/3">
                    <label htmlFor="apiKey" className="font-extrabold">API Key:</label>
                    <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                </div>
            </div>
            <TableContainer className="w-full border border-2 border-gray-400 rounded-lg shadow">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell className="font-bolder">Game ID</TableCell>
                            <TableCell>Game Date</TableCell>
                            <TableCell>Word</TableCell>
                            <TableCell width={"82px"}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ "td": { border: 0 }, "& > :not(:last-child)": { borderBottomWidth: "1px", borderColor: "#E4E7EB" } }}>
                        {fields.map((field, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell scope="row">
                                        <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                                    </TableCell>
                                    <TableCell align="right">
                                        <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="animate-pulse rounded w-full h-12 bg-gray-400"></div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex items-center justify-between w-full">
                    <div className="animate-pulse rounded w-28 h-12 bg-gray-400 mx-[18px]"></div>
                    <div className="animate-pulse rounded w-12 h-12 bg-gray-400 mx-[18px]"></div>
            </div>
        </div>
    </>
    );
}