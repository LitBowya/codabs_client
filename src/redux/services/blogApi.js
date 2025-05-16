import { apiService } from "./apiService";
import { BLOG_URL } from "../constants";

export const blogApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    // Create blog
    createBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Blogs"]
    }),

    // Get all blogs with filters
    getAllBlogs: builder.query({
      query: (params) => ({
        url: `${BLOG_URL}`,
        method: "GET",
        params
      }),
      providesTags: ["Blogs"]
    }),

    // Get single blog
    getBlogById: builder.query({
      query: (id) => `${BLOG_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }]
    }),

    // Update blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_URL}/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }]
    }),

    // Delete blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Blogs"]
    })
  })
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogApi;
