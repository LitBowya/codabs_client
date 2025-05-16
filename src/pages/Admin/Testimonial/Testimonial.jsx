// Testimonial.jsx (Parent Component)
import React from "react";
import { useGetAllTestimonialsQuery } from "../../../redux/services/testimonialApi";
import TestimonialTable from "./TestimonialTable";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";

const Testimonial = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllTestimonialsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={48} color="#3b82f6" />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage title="Error loading testimonials"
                         message={error?.data?.message || "Failed to fetch testimonials"} />;
  }

  return (
    <div className="max-width">
      <TestimonialTable
        testimonials={data?.testimonials || []}
        refetch={refetch}
      />
    </div>
  );
};

export default Testimonial;
