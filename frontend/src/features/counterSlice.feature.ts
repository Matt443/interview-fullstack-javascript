import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../types/models.type";

const counterSlice = createSlice({
    name: "cities",
    initialState: {
        available: ["The Godfather", "Pulp Fiction"],
        searchedFor: "",
        searchedCities: [],
    } as {
        available: string[];
        searchedCities: City[];
        searchedFor: string;
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
    },
});

export const { setSearchedFor, setAllCities, setSearchedCities } = counterSlice.actions;
export default counterSlice.reducer;
