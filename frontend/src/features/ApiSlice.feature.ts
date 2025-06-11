import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
    endpoints: (builder) => ({
        getCities: builder.query<{ name: string }[], { name: string }>({
            query: ({ name }) => ({
                url: "/users",
                params: { name },
            }),
        }),
        getAllCities: builder.query<{ name: string }[], void>({
            query: () => ({
                url: "/users",
            }),
        }),
    }),
});

export const { useLazyGetCitiesQuery, useLazyGetAllCitiesQuery } = apiSlice;
