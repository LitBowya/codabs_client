import React, { useState } from "react";
import { useGetAllProjectsQuery } from "../../../redux/services/projectApi.js";
import { useGetAllSubcategoriesQuery } from "../../../redux/services/subcategoryApi.js";
import ProjectTable from "./ProjectTable";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import StatsDisplay from "./StatsDisplay.jsx";

const Project = () => {
  // State for filters and pagination
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "",
    status: "",
    startDateBefore: "",
    startDateAfter: "",
    hasFinishedImages: "",
    location: ""
  });

  // Fetch projects with current filters
  const { data, isLoading, isError, error, refetch } = useGetAllProjectsQuery(filters);

  // Fetch subcategories and derive categories
  const { data: subcategoriesData } = useGetAllSubcategoriesQuery();
  const subcategories = subcategoriesData?.subcategories || [];
  const categories = [...new Map(
    subcategories.map(sub => [sub.category._id, sub.category])
  ).values()];

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={48} color="#3b82f6" />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage title="Error loading projects" message={error?.data?.message || "Failed to fetch projects"} />;
  }

  return (
    <div className="max-width">
      <StatsDisplay projects={data?.projects || []} isLoading={isLoading} isError={isError} />
      <ProjectTable
        projects={data?.projects || []}
        categories={categories}
        subcategories={subcategories}
        pagination={{
          currentPage: filters.page,
          totalPages: data?.pages || 1,
          totalItems: data?.total || 0,
          itemsPerPage: filters.limit
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        refetch={refetch}
      />
    </div>
  );
};

export default Project;