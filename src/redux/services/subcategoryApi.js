import { apiService } from "./apiService";
import { SUBCATEGORY_URL } from "../constants";

export const subcategoryApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Subcategories"],
  endpoints: (builder) => ({
    // CREATE
    createSubcategory: builder.mutation({
      query: (subcategoryData) => ({
        url: `${SUBCATEGORY_URL}`,
        method: "POST",
        body: subcategoryData
      }),
      invalidatesTags: ["Subcategories"]
    }),

    // GET ALL
    getAllSubcategories: builder.query({
      query: (params) => ({
        url: `${SUBCATEGORY_URL}`,
        method: "GET",
        params
      }),
      providesTags: ["Subcategories"]
    }),

    // GET ONE BY ID
    getSubcategoryById: builder.query({
      query: (id) => ({
        url: `${SUBCATEGORY_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Subcategories", id }]
    }),

    // UPDATE
    updateSubcategory: builder.mutation({
      query: ({ id, ...subcategoryData }) => ({
        url: `${SUBCATEGORY_URL}/${id}`,
        method: "PUT",
        body: subcategoryData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Subcategories", id }]
    }),

    // DELETE
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `${SUBCATEGORY_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Subcategories"]
    })
  })
});

// Export hooks
export const {
  useCreateSubcategoryMutation,
  useGetAllSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation
} = subcategoryApi;
