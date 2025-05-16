import React, { useState } from "react";
import { useGetAllAppointmentsQuery } from "../../../redux/services/appointmentApi.js";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import StatsDisplay from "./StatsDisplay.jsx";
import AppointmentTable from "./AppointmentTable.jsx";

const Appointment = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    sortField: "createdAt",
    sortOrder: "-1"
  });

  const { data, isLoading, isError, error, refetch } = useGetAllAppointmentsQuery(filters);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Spinner size={48} color="#3b82f6" /></div>;
  }

  if (isError) {
    return <ErrorMessage title="Error loading appointments"
                         message={error?.data?.message || "Failed to fetch appointments"} />;
  }

  return (
    <div className="max-width">
      <StatsDisplay appointments={data?.appointments || []} isLoading={isLoading} isError={isError} />
      <AppointmentTable
        appointments={data?.appointments || []}
        pagination={{
          currentPage: data?.page || 1,
          totalPages: data?.totalPages || 1,
          totalItems: data?.total || 0,
          itemsPerPage: data?.limit || 10
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        refetch={refetch}
      />
    </div>
  );
};
export default Appointment;