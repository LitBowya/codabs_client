import { apiService } from "./apiService";
import { PROJECT_URL } from "../constants";

export const projectApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    // CREATE
    createProject: builder.mutation({
      query: (projectData) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: projectData
      }),
      invalidatesTags: ["Projects"]
    }),

    // GET ALL
    getAllProjects: builder.query({
      query: (params) => ({
        url: `${PROJECT_URL}`,
        method: "GET",
        params
      }),
      providesTags: ["Projects"]
    }),

    // GET ONE BY ID
    getProjectById: builder.query({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Projects", id }]
    }),

    // UPDATE
    updateProject: builder.mutation({
      query: ({ id, projectData }) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "PUT",
        body: projectData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Projects", id }]
    }),

    // DELETE
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Projects"]
    })
  })
});

// Export hooks
export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = projectApi;
