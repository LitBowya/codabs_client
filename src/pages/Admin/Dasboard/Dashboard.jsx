import React from "react";
import StatsDisplay from "./StatsDisplay.jsx";
import MonthlyVisitCharts from "./MonthlyVisitCharts.jsx";
import { useGetSummaryQuery } from "../../../redux/services/analyticsApi.js";
import Spinner from "../../../components/Spinner.jsx";
import TopBlogs from "./TopBlogs.jsx";
import TopProjects from "./TopProjects.jsx";
import TopServices from "./TopServices.jsx";

const Dashboard = () => {
  const { data: summary, isLoading, isError, refetch } = useGetSummaryQuery();
  console.log(summary);

  // Process data for top blogs and projects
  const processData = (data) => {
    if (!data) return { topBlogs: [], topProjects: [] };

    const topBlogs = [...data.blogVisits]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const topProjects = [...data.projectVisits]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    const topServices = [...data.serviceVisits]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return { topBlogs, topProjects, topServices };
  };

  const { topBlogs, topProjects, topServices } = processData(summary?.data);

  console.log(topServices);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
          <TopBlogs blogs={topBlogs} />
          <TopServices services={topServices} />
          <div className={`col-span-2`}>
            <TopProjects projects={topProjects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
