// ContactForm.jsx
import React, { useState } from "react";
import { useCreateMessageMutation } from "../../redux/services/contactApi";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import Spinner from "../../components/Spinner.jsx";
import InputField from "../../components/InputField.jsx";
import { FaPhone, FaPlane, FaUser } from "react-icons/fa";
import { FiCalendar, FiMail, FiMessageSquare } from "react-icons/fi";
import { FaMessage } from "react-icons/fa6";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    telephone: "",
    from: "",
    subject: "",
    message: ""
  });

  const [sendContactMessage, { isLoading, isError, error }] = useCreateMessageMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(form).unwrap();
      toast.success("Message sent successfully");
      setForm({
        name: "",
        telephone: "",
        from: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
      {isError && <ErrorMessage message={error?.data?.message || "Something went wrong"} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            icon={<FaUser />}
          />
          <InputField
            label="Phone Number"
            name="telephone"
            type="tel"
            value={form.telephone}
            onChange={handleChange}
            required
            icon={<FaPhone />}
          />
          <InputField
            label="Email Address"
            name="from"
            type="email"
            value={form.from}
            onChange={handleChange}
            required
            icon={<FiMail />}
          />
          <InputField
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            icon={<FaMessage />}
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
            <FaPlane />
            Send Message
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
