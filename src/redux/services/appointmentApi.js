// redux/appointmentApi.js
import { apiService } from "./apiService";
import { APPOINTMENT_URL } from "../constants";

export const appointmentApi = apiService.injectEndpoints({
  overrideExisting: true,
  tagTypes: ["Appointments"],
  endpoints: (builder) => ({
    // CREATE
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: `${APPOINTMENT_URL}`,
        method: "POST",
        body: appointmentData
      }),
      invalidatesTags: ["Appointments"]
    }),

    // GET ALL
    getAllAppointments: builder.query({
      query: (params) => ({
        url: `${APPOINTMENT_URL}`,
        method: "GET",
        params
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.appointments.map(({ _id }) => ({ type: "Appointments", id: _id })),
            { type: "Appointments", id: "LIST" }
          ]
          : [{ type: "Appointments", id: "LIST" }]
    }),

    // ACCEPT
    acceptAppointment: builder.mutation({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}/accept`,
        method: "PUT"
      }),
      invalidatesTags: (result, error, id) => [{ type: "Appointments", id }]
    }),

    // REJECT
    rejectAppointment: builder.mutation({
      query: ({ id, body }) => ({
        url: `${APPOINTMENT_URL}/${id}/reject`,
        method: "PUT",
        body
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Appointments", id }]
    }),

    // TOGGLE AVAILABILITY
    toggleAvailability: builder.mutation({
      query: () => ({
        url: `${APPOINTMENT_URL}/availability/toggle`,
        method: "PUT"
      }),
      invalidatesTags: ["Appointments"]
    }),

    // GET AVAILABILITY
    getAvailability: builder.query({
      query: () => `${APPOINTMENT_URL}/availability`,
      providesTags: [{ type: "Appointments", id: "Availability" }]
    })

  })
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useAcceptAppointmentMutation,
  useRejectAppointmentMutation,
  useToggleAvailabilityMutation,
  useGetAvailabilityQuery
} = appointmentApi;
