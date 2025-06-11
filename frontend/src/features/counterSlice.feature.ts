import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "cities",
    initialState: { available: ["The Godfather", "Pulp Fiction"], searchedFor: "" } as {
        available: string[];
        searchedFor: string;
    },
    reducers: {
        setSearchedFor: (state, action: PayloadAction<string | null>) => {
            state.searchedFor = action.payload ? action.payload : "";
        },
    },
});

export const { setSearchedFor } = counterSlice.actions;
export default counterSlice.reducer;
