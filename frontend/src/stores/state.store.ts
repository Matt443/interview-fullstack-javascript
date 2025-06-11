import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice.feature";
import { apiSlice } from "../features/ApiSlice.feature";

const store = configureStore({
    reducer: {
        data: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
