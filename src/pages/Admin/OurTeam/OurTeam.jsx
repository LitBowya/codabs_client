import { useGetAllTeamMembersQuery } from "../../../redux/services/teamApi";
import OurTeamTable from "./OurTeamTable";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import React from "react";

const OurTeam = () => {

  const { data, isLoading, isError, error, refetch } = useGetAllTeamMembersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={48} color="#3b82f6" />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage title="Error loading team members"
                         message={error?.data?.message || "Failed to fetch team members"} />;
  }

  return (
    <div className={`max-width`}>
      <OurTeamTable
        teamMembers={data?.teamMembers || []}
        refetch={refetch}
      />
    </div>
  );
};
export default OurTeam;
