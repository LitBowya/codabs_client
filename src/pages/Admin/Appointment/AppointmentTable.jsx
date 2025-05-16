import React, { useState } from "react";
import {
  useAcceptAppointmentMutation,
  useRejectAppointmentMutation
} from "../../../redux/services/appointmentApi.js";
import {
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiAlertTriangle,
  FiXCircle,
  FiAlertCircle
} from "react-icons/fi";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import InputField from "../../../components/InputField.jsx";
import Spinner from "../../../components/Spinner.jsx";
import EmptyState from "../../../components/EmptyState.jsx";
import ToggleAvailability from "./ToggleAvailability.jsx";

const AppointmentTable = ({
                            appointments,
                            pagination,
                            filters,
                            onFilterChange,
                            onPageChange,
                            refetch
                          }) => {
  const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);
  const [rejectReasons, setRejectReasons] = useState({});
  const [acceptingId, setAcceptingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [acceptAppointment] = useAcceptAppointmentMutation();
  const [rejectAppointment] = useRejectAppointmentMutation();

  const handleAccept = async (id) => {
    try {
      setAcceptingId(id);
      await acceptAppointment(id).unwrap();
      toast.success("Appointment accepted");
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to accept appointment");
    }
  };

  const handleReject = async (id) => {
    if (!rejectReasons) {
      // Check for empty/whitespace input
      toast.error("Please enter a valid rejection reason");
      return;
    }

    const reason = rejectReasons[id]?.trim() || "";

    try {
      setRejectingId(id);
      await rejectAppointment({
        id,
        body: {
          status: "rejected", // Ensure status is updated
          reasonForRejection: reason // Match schema field name
        }
      }).unwrap();

      toast.success("Appointment rejected");
      setRejectReasons((prev) => ({ ...prev, [id]: "" }));
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to reject appointment");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
      <div className={`p-3 flex justify-end`}>
        <ToggleAvailability />
      </div>
      {/* Filter Controls */}
      <div className="p-4 space-y-4 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            placeholder="Search appointments..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="border rounded-md p-2"
          />
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label={`Date From`}
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="border rounded-md p-2"
            placeholder="From date"
          />
          <InputField
            label={`Date To`}
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange("dateTo", e.target.value)}
            className="border rounded-md p-2"
            placeholder="To date"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {appointments.length === 0 ? (
          <EmptyState
            title="No Appointments found"
            description="No appointments received yet"
          />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <React.Fragment key={appointment._id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setExpandedAppointmentId(
                      expandedAppointmentId === appointment._id
                        ? null
                        : appointment._id
                    )
                  }
                >
                  <td className="px-6 py-4">
                    {expandedAppointmentId === appointment._id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </td>
                  <td className="px-6 py-4">{appointment.name}</td>
                  <td className="px-6 py-4">
                    {format(
                      parseISO(appointment.date),
                      "MMM dd, yyyy hh:mm a"
                    )}
                  </td>
                  <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {appointment.status === "pending" && (
                      <>
                        {acceptingId === appointment._id ? (
                          <Spinner size={24} />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(appointment._id);
                            }}
                            className="text-green-600 cursor-pointer hover:text-green-800"
                          >
                            <FiCheck size={24} />
                          </button>
                        )}
                        {rejectingId === appointment._id ? (
                          <Spinner size={24} />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedAppointmentId(appointment._id);
                            }}
                            className="text-red-600 cursor-pointer hover:text-red-800"
                          >
                            <FiX size={24} />
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>

                {expandedAppointmentId === appointment._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - Contact Information */}
                        <div className="space-y-4 border-r border-gray-200 pr-6">
                          <div className="flex items-start space-x-3">
                            <FiMail className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email
                              </p>
                              <p className="text-gray-900">
                                {appointment.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <FiPhone className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Phone
                              </p>
                              <p className="text-gray-900">
                                {appointment.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <FiMessageSquare className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Message
                              </p>
                              <p className="text-gray-900 whitespace-pre-line">
                                {appointment.message || "N/A"}
                              </p>
                            </div>
                          </div>

                          {appointment.status === "rejected" && (
                            <div className="flex items-start space-x-3">
                              <FiAlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Rejection Reason
                                </p>
                                <p className="text-gray-900">
                                  {appointment.reasonForRejection}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Column - Rejection Form */}
                        {appointment.status === "pending" && (
                          <div className="space-y-4">
                            <div className="relative">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FiXCircle className="inline-block w-4 h-4 mr-1 text-red-600" />
                                Rejection Reason
                              </label>
                              <textarea
                                value={rejectReasons[appointment._id] || ""}
                                onChange={(e) =>
                                  setRejectReasons((prev) => ({
                                    ...prev,
                                    [appointment._id]: e.target.value
                                  }))
                                }
                                placeholder="Please provide a clear reason for rejection..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                rows="4"
                                maxLength={200}
                              />
                              <div className="text-right text-sm mt-1 text-gray-500">
                                {rejectReasons.length}/200
                              </div>
                            </div>

                            {rejectingId === appointment._id ? (
                              <Spinner size={24} />
                            ) : (
                              <button
                                onClick={() => handleReject(appointment._id)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                <>
                                  <FiXCircle className="w-5 h-5 mr-2" />
                                  Confirm Rejection
                                </>
                              </button>
                            )}

                            {rejectReasons.length >= 200 && (
                              <div className="flex items-center text-sm text-red-600">
                                <FiAlertCircle className="mr-2" />
                                Maximum character limit reached
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="text-sm text-gray-700">
          Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
          to{" "}
          {Math.min(
            pagination.currentPage * pagination.itemsPerPage,
            pagination.totalItems
          )}{" "}
          of {pagination.totalItems} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <FiChevronLeft size={24} />
          </button>
          <span className="px-3 py-1">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
