import React from "react";
import StatsDisplay from "./StatsDisplay.jsx";
import MonthlyVisitCharts from "./MonthlyVisitCharts.jsx";
import { useGetSummaryQuery } from "../../../redux/services/analyticsApi.js";

const Dashboard = () => {
  const { data: summary, isLoading, isError, refetch } = useGetSummaryQuery();

  return (
    <div>
      <div className="max-width">
        <h1 className="text-white text-start text-lg lg:text-2xl uppercase">
          Admin Dashboard
        </h1>
        <StatsDisplay />
        <MonthlyVisitCharts
          visitsData={summary?.data?.totalPageVisits || []}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Dashboard;
