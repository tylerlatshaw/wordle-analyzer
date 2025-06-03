"use client";

import axios, { AxiosError } from "axios";
import React from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonProps, CircularProgress, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material/";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import type { PreviousGameInputType, PreviousGameType, UtilityPropsType } from "../../app/lib/type-library";
import dayjs from "dayjs";

type SubmitState = "Idle" | "Success" | "Error";

export function AddPreviousGameContainer(props: UtilityPropsType) {

    function getMostRecentGame() {
        const game = props.previousGameState.previousGames.reduce((prev, current) => {
            return (prev && prev.GameId > current.GameId) ? prev : current;
        });
        return game;
    }

    const mostRecentGame: PreviousGameType = getMostRecentGame();
    const [submitState, setSubmitState] = useState<SubmitState>("Idle");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm<PreviousGameInputType>({
        defaultValues: {
            ApiKey: "",
            GameData: [
                { GameId: mostRecentGame!.GameId + 1, GameDate: dayjs(mostRecentGame!.GameDate).add(1, "day").toString() },
                { GameId: mostRecentGame!.GameId + 2, GameDate: dayjs(mostRecentGame!.GameDate).add(2, "day").toString() },
                { GameId: mostRecentGame!.GameId + 3, GameDate: dayjs(mostRecentGame!.GameDate).add(3, "day").toString() },
                { GameId: mostRecentGame!.GameId + 4, GameDate: dayjs(mostRecentGame!.GameDate).add(4, "day").toString() },
                { GameId: mostRecentGame!.GameId + 5, GameDate: dayjs(mostRecentGame!.GameDate).add(5, "day").toString() },
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "GameData",
        control
    });

    const onSubmit: SubmitHandler<PreviousGameInputType> = async (formData) => {
        setSubmitState("Idle");
        setResponseMessage("");
        setLoadingState(true);

        try {
            const { data } = await axios.post("/api/add-previous-words", {
                GameData: formData.GameData
            } as PreviousGameInputType, {
                headers: {
                    "x-api-key": formData.ApiKey
                }
            });

            let tempMessage = "";
            const addedData: PreviousGameType[] = data.addedData;
            const countAdded = addedData.length;
            const invalidData: PreviousGameInputType["GameData"] = data.invalidData;
            const invalidCount = invalidData.length;

            if (countAdded > 0) {
                tempMessage = "Successfully added " + countAdded + " game" + (countAdded !== 1 ? "s! " : "! ");
                setSubmitState("Success");

                reset({
                    ApiKey: "",
                    GameData: [
                        { GameId: mostRecentGame!.GameId + 1, GameDate: dayjs(mostRecentGame!.GameDate).add(1, "day").toString() },
                        { GameId: mostRecentGame!.GameId + 2, GameDate: dayjs(mostRecentGame!.GameDate).add(2, "day").toString() },
                        { GameId: mostRecentGame!.GameId + 3, GameDate: dayjs(mostRecentGame!.GameDate).add(3, "day").toString() },
                        { GameId: mostRecentGame!.GameId + 4, GameDate: dayjs(mostRecentGame!.GameDate).add(4, "day").toString() },
                        { GameId: mostRecentGame!.GameId + 5, GameDate: dayjs(mostRecentGame!.GameDate).add(5, "day").toString() },
                    ]
                });
            } else {
                setSubmitState("Error");
            }

            if (invalidCount > 0) {
                tempMessage = tempMessage + "Unable to add ";
                invalidData.forEach((word, index) => {
                    tempMessage = tempMessage.concat(word.Word);
                    if (invalidCount - 2 === index && invalidCount >= 3)
                        tempMessage = tempMessage.concat(", and ");
                    else if (invalidCount - 1 !== index && invalidCount >= 3)
                        tempMessage = tempMessage.concat(", ");
                    else if (invalidCount - 2 === index)
                        tempMessage = tempMessage.concat(" and ");
                });
            }

            setResponseMessage(tempMessage);
        } catch (e) {
            const error = e as AxiosError;
            const errorMessage = error.response?.data as unknown as { error: string };
            setResponseMessage(errorMessage.error);
            setSubmitState("Error");
            console.log("An error occurred: " + e);
        }

        setLoadingState(false);
    };

    function GetResponseCssClass() {
        if (submitState === "Success") {
            return "positive-response";
        }

        if (submitState === "Error") {
            return "negative-response";
        }

        return "";
    }

    const inputStyles = "bg-slate-100 px-3 py-1";

    const DeleteButton = styled(Button)<ButtonProps>(() => ({
        minWidth: "48px",
        minHeight: "48px",
        maxWidth: "48px",
        maxHeight: "48px",
        color: "white",
        backgroundColor: "#FA2C37",
        "&:hover": {
            backgroundColor: "#E7000B",
        },
        "&:disabled": {
            color: "white",
            backgroundColor: "#E7000B",
            cursor: "not-allowed"
        },
    }));

    const AddButton = styled(Button)<ButtonProps>(() => ({
        minWidth: "48px",
        minHeight: "48px",
        maxWidth: "48px",
        maxHeight: "48px",
        marginRight: "20px",
        marginLeft: "20px",
        color: "white",
        backgroundColor: "#0BA5E9",
        "&:hover": {
            backgroundColor: "#0568A0",
        },
        "&:disabled": {
            color: "white",
            backgroundColor: "#0568A0",
            cursor: "not-allowed"
        },
    }));

    const SubmitButton = styled(Button)<ButtonProps>(() => ({
        minHeight: "48px",
        maxHeight: "48px",
        marginRight: "20px",
        marginLeft: "20px",
        paddingLeft: "14px",
        paddingRight: "14px",
        color: "white",
        backgroundColor: "#00A53D",
        "&:hover": {
            backgroundColor: "#008236",
        },
        "&:disabled": {
            color: "white",
            backgroundColor: "#008236",
            cursor: "not-allowed"
        },
    }));

    return (<>
        <h2>Add Previous Games</h2>

        <form className="flex flex-col gap-3 w-full lg:w-[827px]" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between w-full mt-2 mb-4">
                <div className="flex flex-col self-end gap-1 h-full w-2/3">
                    <div><span className="font-extrabold">Most Recent Game ID: </span>{mostRecentGame?.GameId}</div>
                    <div><span className="font-extrabold">Most Recent Game Date: </span>{dayjs(mostRecentGame?.GameDate).format("MM/DD/YYYY")}</div>
                </div>
                <div className="flex flex-col w-1/3">
                    <label htmlFor="apiKey" className="font-extrabold">API Key:</label>
                    <TextField
                        {...register("ApiKey")}
                        placeholder="Enter an API Key"
                        type="password"
                        required
                        disabled={loadingState}
                        className={inputStyles}
                        sx={{ "div": { "minHeight": "48px", "maxHeight": "48px" } }}
                    />
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
                                        <TextField
                                            {...register(`GameData.${index}.GameId` as const)}
                                            placeholder="Enter a Game ID"
                                            type="number"
                                            required
                                            disabled={loadingState}
                                            className={inputStyles}
                                            sx={{ "div": { "minHeight": "48px", "maxHeight": "48px" } }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Controller
                                                name={`GameData.${index}.GameDate` as const}
                                                control={control}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        value={dayjs(field.value)}
                                                        onChange={field.onChange}
                                                        disabled={loadingState}
                                                        className={inputStyles}
                                                        sx={{ "div": { "minHeight": "48px", "maxHeight": "48px" }, ".MuiPickersSectionList-root": { alignItems: "center" } }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            {...register(`GameData.${index}.Word` as const)}
                                            placeholder="Enter a Word"
                                            type="text"
                                            required
                                            disabled={loadingState}
                                            className={inputStyles}
                                            sx={{ "input": { textTransform: "uppercase" }, "input::placeholder": { textTransform: "none" }, "div": { "minHeight": "48px", "maxHeight": "48px" } }}
                                            slotProps={{ htmlInput: { maxLength: 5 } }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {
                                            fields.length !== 1 ?
                                                <>
                                                    <DeleteButton onClick={() => remove(index)}>
                                                        <DeleteIcon />
                                                    </DeleteButton>
                                                </> : null
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="flex items-center justify-between w-full">
                <div>
                    <SubmitButton type="submit" disabled={loadingState}>
                        <span className="flex items-center">
                            {loadingState ? <>Submit&nbsp;<CircularProgress size={16} sx={{ color: "white" }} /></> : <>Submit&nbsp;<SendIcon className="text-lg flex items-center" /></>}
                        </span>
                    </SubmitButton>
                </div>

                <p className={`w-full max-w-full pl-3 text-md wrap-normal break-normal  ${GetResponseCssClass()}`}>{responseMessage}</p>

                <AddButton onClick={() => append({
                    GameId: fields[fields.length - 1].GameId! + 1,
                    GameDate: dayjs(fields[fields.length - 1].GameDate).add(1, "day").toString(),
                    Word: ""
                })}>
                    <AddIcon />
                </AddButton>
            </div>
        </form>
    </>
    );
}