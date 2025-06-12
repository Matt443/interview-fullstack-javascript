import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice.feature";

const store = configureStore({
    reducer: {
        data: counterReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
