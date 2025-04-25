import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants";


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `bearer ${token}`);
        }
        return headers;
    },
});

export const apiService = createApi({
    baseQuery,
    endpoints: () => ({}), // Will be extended in other slices
});
