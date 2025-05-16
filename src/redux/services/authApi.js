import { apiService } from "./apiService";
import { AUTH_URL } from "../constants";

export const authApi = apiService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: userData
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST"
      })
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        body
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResetPasswordMutation
} = authApi;
