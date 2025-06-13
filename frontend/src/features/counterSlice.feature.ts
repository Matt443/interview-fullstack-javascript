import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../types/models.type";

const counterSlice = createSlice({
    name: "cities",
    initialState: {
        available: ["The Godfather", "Pulp Fiction"],
        searchedFor: "",
        searchedCities: [],
        perPage: 10,
        page: 1,
        pagesQuantity: 0,
        min: "",
        max: "",
        newCityName: "",
        newCityCount: 0,
        addMessage: "",
        toDelete: [],
    } as {
        available: string[];
        searchedCities: City[];
        searchedFor: string;
        perPage: number;
        page: number;
        pagesQuantity: number;
        min: string;
        max: string;
        newCityName: string;
        newCityCount: number;
        addMessage: string;
        toDelete: string[];
    },
    reducers: {
        setSearchedFor: (state, action: PayloadAction<string | null>) => {
            state.searchedFor = action.payload ? action.payload : "";
        },
        setAllCities: (state, action: PayloadAction<string[]>) => {
            state.available = [...action.payload];
        },
        setSearchedCities: (state, action: PayloadAction<City[]>) => {
            state.searchedCities = [...action.payload];
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
        setPagesQuantity: (state, action: PayloadAction<number>) => {
            state.pagesQuantity = action.payload;
        },
        setMin: (state, action: PayloadAction<string>) => {
            state.min = action.payload;
        },
        setMax: (state, action: PayloadAction<string>) => {
            state.max = action.payload;
        },
        setNewCityName: (state, action: PayloadAction<string>) => {
            state.newCityName = action.payload;
        },
        setNewCityCount: (state, action: PayloadAction<number>) => {
            state.newCityCount = action.payload;
        },
        setAddMessage: (state, action: PayloadAction<string>) => {
            state.addMessage = action.payload;
        },
        setToDelete: (state, action: PayloadAction<string[]>) => {
            state.toDelete = [...action.payload];
        },
    },
});

export const {
    setSearchedFor,
    setAllCities,
    setSearchedCities,
    setPage,
    setPerPage,
    setPagesQuantity,
    setMin,
    setMax,
    setNewCityCount,
    setNewCityName,
    setAddMessage,
    setToDelete,
} = counterSlice.actions;
export default counterSlice.reducer;
