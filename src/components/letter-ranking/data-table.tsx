"use client";

import axios from "axios";
import { LetterRankingByGroupType, LetterRankingType } from "../../app/lib/type-library";
import { DataGrid, GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import NoDataFound from "../global-components/no-data-found";
import { alphabet } from "../../app/lib/alphabet";

type RowType = {
    id: number,
    letter: string,
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    p5: string,
}

export default function DataTable() {

    const [data, setData] = useState<LetterRankingByGroupType[]>();
    const rows: RowType[] = [];

    useEffect(() => {
        try {
            axios.get("/api/get-letter-ranking").then((response) => {
                setData(transformDataToGrouping(response.data));
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    function transformDataToGrouping(data: LetterRankingType[]) {
        const tempArray: LetterRankingByGroupType[] = [];

        alphabet.forEach((currentLetter) => {

            const filteredData = data.filter((letter) => {
                return currentLetter.toLowerCase() === letter.Letter.toLowerCase();
            }).sort((a, b) =>
                (a.Position > b.Position) ? 1 : -1
            );

            tempArray.push({
                Letter: currentLetter.toUpperCase(),
                Scores: {
                    Position1: filteredData[0].Score,
                    Position2: filteredData[1].Score,
                    Position3: filteredData[2].Score,
                    Position4: filteredData[3].Score,
                    Position5: filteredData[4].Score
                }
            });
        });

        return tempArray;
    }

    data?.forEach((row) => {
        const index = data.findIndex((value) => value.Letter === row.Letter);
        rows.push({
            id: index + 1,
            letter: row.Letter,
            p1: row.Scores.Position1.toFixed(5),
            p2: row.Scores.Position2.toFixed(5),
            p3: row.Scores.Position3.toFixed(5),
            p4: row.Scores.Position4.toFixed(5),
            p5: row.Scores.Position5.toFixed(5),
        });
    });

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", type: "number", headerClassName: "bg-gray-300" },
        { field: "letter", headerName: "Letter", type: "string", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "p1", headerName: "1", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "p2", headerName: "2", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "p3", headerName: "3", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "p4", headerName: "4", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "p5", headerName: "5", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: "Score for Letter Position",
            children: [{ field: "p1" }, { field: "p2" }, { field: "p3" }, { field: "p4" }, { field: "p5" }]
        },
    ];

    function CustomNoResultsOverlay() {
        return NoDataFound("Data");
    }

    return <>
        <div className="flex flex-row items-center justify-center w-full my-8">

            <div className="px-6 w-full overflow-x-auto">

                <div className="p-2 mx-auto w-full">
                    <div className="mx-auto w-full sm:w-2/3 md:w-2/5 lg:1/4">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            columnGroupingModel={columnGroupingModel}
                            columnGroupHeaderHeight={36}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        id: false,
                                    },
                                },
                                filter: {
                                    filterModel: {
                                        items: []
                                    }
                                }
                            }}
                            slots={{
                                noResultsOverlay: CustomNoResultsOverlay
                            }}
                            hideFooter
                        />
                    </div>
                </div>

            </div>

        </div>
    </>;
}