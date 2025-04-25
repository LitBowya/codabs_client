import { apiService } from "./apiService";
import { AUTH_URL} from "../constants";

export const authApi = apiService.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: credentials
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;
