// redux/serviceApi.js
import { apiService } from "./apiService";
import { SERVICE_URL } from "../constants";

export const serviceApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    // CREATE
    createService: builder.mutation({
      query: (serviceData) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        body: serviceData
      }),
      invalidatesTags: ["Services"]
    }),

    // GET ALL
    getAllServices: builder.query({
      query: (params) => ({
        url: `${SERVICE_URL}`,
        method: "GET",
        params
      }),
      providesTags: ["Services"]
    }),

    // GET ONE BY ID
    getServiceById: builder.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Services", id }]
    }),

    // UPDATE
    updateService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "PUT",
        body: serviceData
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Services", id }]
    }),

    // DELETE
    deleteService: builder.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Services"]
    })
  })
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = serviceApi;
