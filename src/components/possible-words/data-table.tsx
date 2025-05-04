"use client";

import axios from "axios";
import { WordType } from "../../app/lib/type-library";
import { DataGrid, GridColDef, QuickFilter, QuickFilterClear, QuickFilterControl, QuickFilterTrigger, Toolbar, ToolbarButton } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Tooltip, InputAdornment, TextField, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import NoDataFound from "../global-components/no-data-found";

type OwnerState = {
    expanded: boolean;
};

type RowType = {
    id: number,
    word: string,
    score: string,
}

export default function DataTable() {

    const [data, setData] = useState<WordType[]>();
    const rows: RowType[] = [];

    useEffect(() => {
        try {
            axios.get("/api/get-possible-words").then((response) => {
                setData(response.data);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    data?.forEach((row) => {
        rows.push({
            id: row.WordleWordId,
            word: row.Word,
            score: row.Score.toFixed(5),
        });
    });

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", type: "number", headerClassName: "bg-gray-300" },
        { field: "word", headerName: "Word", type: "string", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
        { field: "score", headerName: "Score", type: "number", headerClassName: "bg-gray-300", headerAlign: "center", align: "center", flex: 1 },
    ];

    const paginationModel = { page: 0, pageSize: 10 };

    const StyledQuickFilter = styled(QuickFilter)({
        display: "grid",
        alignItems: "center",
        marginLeft: "auto",
    });

    const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
        ({ theme, ownerState }) => ({
            gridArea: "1 / 1",
            width: "min-content",
            height: "min-content",
            zIndex: 1,
            opacity: ownerState.expanded ? 0 : 1,
            pointerEvents: ownerState.expanded ? "none" : "auto",
            transition: theme.transitions.create(["opacity"]),
        }),
    );

    const StyledTextField = styled(TextField)<{
        ownerState: OwnerState;
    }>(({ theme, ownerState }) => ({
        gridArea: "1 / 1",
        overflowX: "clip",
        width: ownerState.expanded ? 260 : "var(--trigger-width)",
        opacity: ownerState.expanded ? 1 : 0,
        transition: theme.transitions.create(["width", "opacity"]),
    }));

    function CustomToolbar() {
        return (
            <Toolbar>
                <StyledQuickFilter expanded>
                    <QuickFilterTrigger
                        render={(triggerProps, state) => (
                            <Tooltip title="Search" enterDelay={0}>
                                <StyledToolbarButton
                                    {...triggerProps}
                                    ownerState={{ expanded: state.expanded }}
                                    color="default"
                                    aria-disabled={state.expanded}
                                >
                                    <SearchIcon fontSize="small" />
                                </StyledToolbarButton>
                            </Tooltip>
                        )}
                    />
                    <QuickFilterControl
                        render={({ ref, ...controlProps }, state) => (
                            <StyledTextField
                                {...controlProps}
                                ownerState={{ expanded: state.expanded }}
                                inputRef={ref}
                                aria-label="Search"
                                placeholder="Search..."
                                size="small"
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: state.value ? (
                                            <InputAdornment position="end">
                                                <QuickFilterClear
                                                    edge="end"
                                                    size="small"
                                                    aria-label="Clear search"
                                                // material={{ sx: { marginRight: -0.75 } }}
                                                >
                                                    <CancelIcon fontSize="small" />
                                                </QuickFilterClear>
                                            </InputAdornment>
                                        ) : null,
                                        ...controlProps.slotProps?.input,
                                    },
                                    ...controlProps.slotProps,
                                }}
                            />
                        )}
                    />
                </StyledQuickFilter>
            </Toolbar>
        );
    }

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
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        id: false,
                                    },
                                },
                                pagination: { paginationModel },
                                filter: {
                                    filterModel: {
                                        items: []
                                    }
                                }
                            }}
                            pagination
                            pageSizeOptions={[10, 25, 50, 100]}
                            slots={{
                                toolbar: CustomToolbar,
                                noResultsOverlay: CustomNoResultsOverlay
                            }}
                            showToolbar
                        />
                    </div>
                </div>

            </div>

        </div>
    </>;
}