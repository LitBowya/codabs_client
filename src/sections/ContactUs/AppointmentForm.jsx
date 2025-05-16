// AppointmentForm.jsx
import React, { useState } from "react";
import {
  useCreateAppointmentMutation,
  useGetAvailabilityQuery
} from "../../redux/services/appointmentApi";
import InputField from "../../components/InputField.jsx";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { FiCalendar, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { AiFillExclamationCircle } from "react-icons/ai";

const AppointmentForm = () => {
  const {
    data: availabilityData,
    isLoading: isLoadingAvailability,
    isError: isAvailabilityError
  } = useGetAvailabilityQuery();
  const [createAppointment, { isLoading, isError, error }] =
    useCreateAppointmentMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(form).unwrap();
      toast.success("Appointment requested successfully!");
      setForm({ name: "", email: "", phone: "", date: "", message: "" });
    } catch (error) {
      toast.error(error.data?.message || "Failed to book appointment");
    }
  };

  if (isLoadingAvailability) return <Spinner />;
  if (isAvailabilityError)
    return <ErrorMessage message="Failed to load availability" />;
  if (!availabilityData?.isAvailable)
    return (
      <div className="bg-orange-100 p-4 rounded-lg border border-orange-200 text-orange-800 flex items-center gap-3">
        <AiFillExclamationCircle className="w-6 h-6" />
        Appointments are currently unavailable. Please check back later.
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Book a Consultation
      </h2>
      {isError && (
        <ErrorMessage
          message={error?.data?.message || "Something went wrong"}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            icon={<FiUser className="h-5 w-5" />}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            icon={<FiMail className="h-5 w-5" />}
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            icon={<FiPhone className="h-5 w-5" />}
          />
          <InputField
            label="Preferred Date & Time"
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            required
            icon={<FiCalendar className="h-5 w-5" />}
          />
        </div>

        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className={`w-full border border-gray-300 rounded-md p-2`}
        />

        {isLoading ? (
          <>
            <Spinner />
          </>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary-light cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiCalendar />
            Book Appointment
          </button>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;
