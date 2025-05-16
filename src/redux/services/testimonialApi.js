import { apiService } from "./apiService";
import { TESTIMONIAL_URL } from "../constants"; // e.g., "/api/testimonials"

export const testimonialApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    // Get all testimonials (with optional ?approved=true/false)
    getAllTestimonials: builder.query({
      query: () => ({
        url: `${TESTIMONIAL_URL}`,
        method: "GET"
      }),
      providesTags: ["Testimonial"]
    }),

    // Get testimonial by ID
    getTestimonialById: builder.query({
      query: (id) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [{ type: "Testimonial", id }]
    }),

    // Create new testimonial
    createTestimonial: builder.mutation({
      query: (data) => ({
        url: `${TESTIMONIAL_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Testimonial"]
    }),

    // Update testimonial
    updateTestimonial: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "PUT",
        body: updates
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Testimonial", id },
        "Testimonial"
      ]
    }),

    // Delete testimonial
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Testimonial"]
    })
  })
});

export const {
  useGetAllTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation
} = testimonialApi;
