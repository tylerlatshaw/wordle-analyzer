import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export function UpdateScoresLoadingContainer() {

    return <>
        <h2 className="mt-1">Update Scores</h2>

        <div className="flex flex-col gap-3 w-full">
            <TableContainer className="w-full border border-2 border-gray-400 rounded-lg shadow">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell>Database Values</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ "td": { border: 0 }, "& > :not(:last-child)": { borderBottomWidth: "1px", borderColor: "#E4E7EB" } }}>
                        <TableRow>
                            <TableCell>
                                <span className="text-base">Letter Rankings</span>
                            </TableCell>
                            <TableCell>
                                <div className="animate-pulse rounded w-52 h-12 bg-gray-400"></div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span className="text-base">Word Scores</span>
                            </TableCell>
                            <TableCell>
                                <div className="animate-pulse rounded w-52 h-12 bg-gray-400"></div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>;
}