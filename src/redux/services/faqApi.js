// src/redux/services/faqApi.js
import { apiService } from "./apiService";
import { FAQ_URL } from "../constants";

export const faqApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    tagTypes: ["Faq"],
    getAllFaqs: builder.query({
      query: () => ({
        url: `${FAQ_URL}`,
        method: "GET"
      }),
      providesTags: ["Faq"]
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: `${FAQ_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Faq"]
    }),

    updateFaq: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${FAQ_URL}/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Faq"]
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Faq"]
    })
  })
});

export const {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation
} = faqApi;
