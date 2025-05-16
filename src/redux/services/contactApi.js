import { apiService } from "./apiService";
import { CONTACT_URL } from "../constants";

export const contactApi = apiService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (body) => ({
        url: `${CONTACT_URL}`,
        method: "POST",
        body
      })
    })
  })
});

export const {
  useCreateMessageMutation
} = contactApi;
