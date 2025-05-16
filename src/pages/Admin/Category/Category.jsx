import { useGetAllCategoriesQuery } from "../../../redux/services/categoryApi.js";
import { useGetAllSubcategoriesQuery } from "../../../redux/services/subcategoryApi.js";
import CategoryTable from "./CategoryTable.jsx";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import React from "react";
import SubCategoryTable from "./SubCategoryTable.jsx";


const Category = () => {

  const { data, isLoading, isError, error, refetch } = useGetAllCategoriesQuery();
  const {
    data: subCategory,
    isLoading: subIsLoading,
    isError: subIsError,
    error: subError,
    refetch: subRefetch
  } = useGetAllSubcategoriesQuery();

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

  if (subIsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={48} color="#3b82f6" />
      </div>
    );
  }

  if (subIsError) {
    return <ErrorMessage title="Error loading subcategories"
                         message={subError?.data?.message || "Failed to fetch subcategories"} />;
  }

  return (
    <div className={`max-width`}>
      <CategoryTable
        categories={data?.categories || []}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      <SubCategoryTable
        subcategories={subCategory?.subcategories || []}
        isLoading={subIsLoading}
        isError={subIsError}
        refetch={subRefetch}
      />
    </div>
  );
};
export default Category;
