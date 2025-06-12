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
    } as {
        available: string[];
        searchedCities: City[];
        searchedFor: string;
        perPage: number;
        page: number;
        pagesQuantity: number;
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
    },
});

export const {
    setSearchedFor,
    setAllCities,
    setSearchedCities,
    setPage,
    setPerPage,
    setPagesQuantity,
} = counterSlice.actions;
export default counterSlice.reducer;
