import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/stateSlice.feature";

const store = configureStore({
    reducer: {
        data: counterReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
