// TestimonialTable.jsx
import React, { useState } from "react";
import {
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation
} from "../../../redux/services/testimonialApi";
import {
  FiEdit,
  FiTrash,
  FiPlus,
  FiChevronUp,
  FiChevronDown
} from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import EmptyState from "../../../components/EmptyState";

const TestimonialTable = ({ testimonials, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    message: "",
    rating: 5,
    image: "",
    isApproved: false
  });

  // RTK Query mutations
  const [createTestimonial, { isLoading: isCreating }] =
    useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdating }] =
    useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: isDeleting }] =
    useDeleteTestimonialMutation();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTestimonial) {
        await updateTestimonial({
          id: selectedTestimonial._id,
          ...formData
        }).unwrap();
        toast.success("Testimonial updated successfully");
      } else {
        await createTestimonial(formData).unwrap();
        toast.success("Testimonial created successfully");
      }
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestimonial(selectedTestimonial._id).unwrap();
      toast.success("Testimonial deleted successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Deletion failed");
    }
  };

  const openEditModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      message: testimonial.message,
      rating: testimonial.rating,
      image: testimonial.image
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTestimonial(null);
    setFormData({
      name: "",
      company: "",
      position: "",
      message: "",
      rating: 5,
      image: ""
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FiPlus className="mr-2" /> Add Testimonial
        </button>
      </div>

      <div className="space-y-2">
        {testimonials.length === 0 ? (
          <EmptyState
            title="No Testimonials Found"
            description="Start by adding new testimonials"
          />
        ) : (
          <>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className=" rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExpandedId(
                      expandedId === testimonial._id ? null : testimonial._id
                    )
                  }
                >
                  <div className="flex items-center space-x-4">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.company}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">
                          {"★".repeat(testimonial.rating)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({testimonial.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(testimonial);
                        }}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                      >
                        <FiEdit size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(testimonial);
                        }}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      >
                        <FiTrash size={24} />
                      </button>
                      {expandedId === testimonial._id ? (
                        <FiChevronUp size={24} />
                      ) : (
                        <FiChevronDown size={24} />
                      )}
                    </div>
                  </div>
                </div>

                {expandedId === testimonial._id && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Details</h4>
                        <p className="text-gray-600">
                          <span className="font-semibold">Position:</span>{" "}
                          {testimonial.position}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Message</h4>
                        <p className="text-gray-600 whitespace-pre-line">
                          {testimonial.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          {selectedTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <InputField
            label="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />

          <InputField
            label="Position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Rating</label>
            <select
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
              className="w-full p-2 border rounded"
              required
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            multiline="true"
            rows="4"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover mt-2"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded"
              disabled={isCreating || isUpdating}
            >
              Cancel
            </button>
            {
              (isCreating || isUpdating) ? <Spinner /> : <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer hover:bg-blue-500 text-white rounded flex items-center justify-center"
                disabled={isCreating || isUpdating}
              >
                {selectedTestimonial ? (
                  "Update Testimonial"
                ) : (
                  "Create Testimonial"
                )}
              </button>
            }
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">
            Are you sure you want to delete {selectedTestimonial?.name}'s
            testimonial?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={isDeleting}
            >
              Cancel
            </button>
            {isDeleting ? (
              <Spinner />
            ) : (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 flex items-center"
                disabled={isDeleting}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestimonialTable;
