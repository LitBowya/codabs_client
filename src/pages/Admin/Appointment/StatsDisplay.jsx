import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiList
} from "react-icons/fi";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import StatCard from "../../../components/Admin/StatCard.jsx";

const StatsDisplay = ({ appointments, isError, isLoading }) => {

  const statusCounts = appointments.reduce((acc, appointment) => {
    const { status } = appointment;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { pending: 0, accepted: 0, rejected: 0 });

  const stats = [
    {
      icon: <FiClock size={24} />,
      value: statusCounts.pending,
      text: "Pending Appointments"
    },
    {
      icon: <FiCheckCircle size={24} />,
      value: statusCounts.accepted,
      text: "Accepted Appointments"
    },
    {
      icon: <FiXCircle size={24} />,
      value: statusCounts.rejected,
      text: "Rejected Appointments"
    },
    {
      icon: <FiList size={24} />,
      value: appointments.length || 0,
      text: "Total Appointments"
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex justify-center items-center p-4 bg-gray-800 rounded-lg h-40">
              <Spinner />
            </div>
          ))
          : isError
            ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}
                   className="flex justify-center items-center p-4 bg-red-500 rounded-lg h-40">
                <ErrorMessage message="Failed to load data" />
              </div>
            ))
            : stats.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={stat.icon}
                value={stat.value}
                text={stat.text}
              />
            ))}
      </div>
    </div>
  );
};
export default StatsDisplay;
