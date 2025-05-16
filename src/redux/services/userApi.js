import { apiService } from "./apiService";
import { USER_URL } from "../constants"; // e.g., "/api/users"

export const userApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: (params) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: {
          search: params?.search,
          role: params?.role,
          sort: params?.sort,
          page: params?.page,
          limit: params?.limit
        }
      }),
      providesTags: ["User"]
    }),

    // Get user by ID
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "User", id }]
    }),

    // Update user info
    updateUser: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${USER_URL}/${id}`,
        method: "PUT",
        body: updates
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User"
      ]
    }),

    // Update user role
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `${USER_URL}/${id}/role`,
        method: "PUT",
        body: { role }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User"
      ]
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["User"]
    })
  })
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = userApi;
