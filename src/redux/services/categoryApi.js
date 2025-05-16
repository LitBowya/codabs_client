// redux/categoryApi.js
import { apiService } from "./apiService";
import { CATEGORY_URL } from "../constants";

export const categoryApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // CREATE
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: categoryData
      }),
      invalidatesTags: ["Categories"]
    }),

    // GET ALL
    getAllCategories: builder.query({
      query: (params) => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        params
      }),
      providesTags: ["Categories"]
    }),

    // GET ONE BY ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Categories", id }]
    }),

    // UPDATE
    updateCategory: builder.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: categoryData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Categories", id }]
    }),

    // DELETE
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Categories"]
    })
  })
});

// Export hooks
export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
