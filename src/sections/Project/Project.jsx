import React, { useState } from "react";
import { useGetAllProjectsQuery } from "../../redux/services/projectApi.js";
import { useGetAllSubcategoriesQuery } from "../../redux/services/subcategoryApi.js";
import ProjectList from "./ProjectList.jsx";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

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
  const { data, isLoading, isError, error } = useGetAllProjectsQuery(filters);

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
      <ProjectList
        projects={data?.projects || []}
        categories={categories}
        subcategories={subcategories}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Project;
