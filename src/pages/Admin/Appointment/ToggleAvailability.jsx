import React from "react";
import {
  useGetAvailabilityQuery,
  useToggleAvailabilityMutation
} from "../../../redux/services/appointmentApi";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";

const ToggleAvailability = () => {
  const { data, isLoading, isError, refetch } = useGetAvailabilityQuery();
  const [toggleAvailability, { isLoading: toggling }] = useToggleAvailabilityMutation();

  const handleToggle = async () => {
    await toggleAvailability();
    toast.success("Availability updated successfully.");
    refetch();
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="flex items-center gap-4">
      <p>Status: {data?.isAvailable ? "Available for appointments" : "Not available"}</p>
      <button
        onClick={handleToggle}
        disabled={toggling}
        className={`${data.isAvailable ? "bg-green-600" : "bg-red-600"} text-white px-4 py-2 rounded cursor-pointer`}
      >
        {data?.isAvailable ? "Disable Appointments" : "Enable Appointments"}
      </button>
    </div>
  );
};

export default ToggleAvailability;
