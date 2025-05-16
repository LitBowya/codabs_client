import {apiService} from "./apiService";
import {TEAM_URL} from "../constants";

export const teamApi = apiService.injectEndpoints({
    overrideExisting: true,
    tagTypes: ["TeamMember"],
    endpoints: (builder) => ({
        getAllTeamMembers: builder.query({
            query: () => ({
                url: `${TEAM_URL}`,
                method: "GET"
            }),
            providesTags: ["TeamMember"]
        }),

        getTeamMemberById: builder.query({
            query: (id) => ({
                url: `${TEAM_URL}/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, id) => [{type: "TeamMember", id}]
        }),

        createTeamMember: builder.mutation({
            query: (data) => ({
                url: `${TEAM_URL}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["TeamMember"]
        }),

        updateTeamMember: builder.mutation({
            query: ({id, ...data}) => ({
                url: `${TEAM_URL}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: (result, error, {id}) => [
                {type: "TeamMember", id},
                "TeamMember"
            ]
        }),

        deleteTeamMember: builder.mutation({
            query: (id) => ({
                url: `${TEAM_URL}/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["TeamMember"]
        })
    })
});

export const {
    useGetAllTeamMembersQuery,
    useGetTeamMemberByIdQuery,
    useCreateTeamMemberMutation,
    useUpdateTeamMemberMutation,
    useDeleteTeamMemberMutation
} = teamApi;
