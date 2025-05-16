import { apiService } from "./apiService";
import { ANALYTICS_URL } from "../constants";

export const analyticsApi = apiService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => ({
        url: `${ANALYTICS_URL}`,
        method: "GET"
      })
    }),
    getCount: builder.query({
      query: () => ({
        url: `${ANALYTICS_URL}/count`,
        method: "GET"
      })
    })
  })
});

export const {
  useGetSummaryQuery,
  useGetCountQuery
} = analyticsApi;
