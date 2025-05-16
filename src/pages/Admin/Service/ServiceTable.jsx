import React, { useEffect, useState } from "react";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} from "../../../redux/services/servicesApi.js";
import { useGetAllCategoriesQuery } from "../../../redux/services/categoryApi";
import { FiEdit, FiTrash, FiPlus, FiImage, FiChevronDown, FiChevronUp, FiXCircle } from "react-icons/fi";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { toast } from "react-toastify";
import EmptyState from "../../../components/EmptyState.jsx";

const ServiceTable = () => {
  const { data: services, isLoading, error, refetch } = useGetAllServicesQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const [createService, {
    isLoading: isCreateLoading,
    isError: isCreateError,
    error: createError
  }] = useCreateServiceMutation();
  const [updateService, {
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    error: updateError
  }] = useUpdateServiceMutation();
  const [deleteService, {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteServiceMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedService, setExpandedService] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    category: ""
  });

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const base64Images = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64Images.push(reader.result);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.images.length || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      if (selectedService) {
        await updateService({ id: selectedService._id, ...formData }).unwrap();
        toast.success("Service updated successfully");
      } else {
        await createService(formData).unwrap();
        toast.success("Service created successfully");
      }
      closeModal();
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Operation failed");
    }
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      images: service.images,
      category: service.category._id
    });
    setIsEditModalOpen(true);
  };

  const openCreateModal = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      category: ""
    });
    setIsCreateModalOpen(true);
  };

  // Delete Confirmation Modal Handlers
  const confirmDelete = async () => {
    try {
      await deleteService(selectedService._id).unwrap();
      toast.success("Service deleted successfully");
      closeModal();
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Delete failed");
    }
  };

  const openDeleteModal = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const toggleExpand = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedService(null);
    setErrorMessage("");
  };

  // Error handling effects
  useEffect(() => {
    if (isCreateError) {
      toast.error(createError?.data?.message || "Failed to create service");
    }
    if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update service");
    }
    if (isDeleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete service");
    }
  }, [isCreateError, isUpdateError, isDeleteError, createError?.data?.message, updateError?.data?.message, deleteError?.data?.message]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message="Failed to load services" />;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={openCreateModal}
          className="bg-primary hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded flex items-center"
        >
          <FiPlus className="mr-2" /> Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        {services?.services?.length === 0 ? <EmptyState
          title="No Services found"
          description="You haven't created any service yet."
        /> : <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {services?.services?.map(service => (
            <React.Fragment key={service._id}>
              <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleExpand(service._id)}>
                <td className="px-6 py-4">
                  {service.images?.length > 0 && (
                    <img
                      src={service.images[0]}
                      alt="Service"
                      className="h-12 w-12 rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{service.title}</td>
                <td className="px-6 py-4">
                  {service.category?.map(({ name, _id }) => (
                    <span key={_id}>{name}</span>
                  ))}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(service);
                    }}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    <FiEdit size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(service);
                    }}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  >
                    <FiTrash size={24} />
                  </button>
                  <span className="inline-block ml-2">
                      {expandedService === service._id ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                    </span>
                </td>
              </tr>

              {expandedService === service._id && (
                <tr className="bg-gray-50">
                  <td colSpan="4" className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 border">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-700 border block w-full">{service.description}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">All Images</h3>
                        <div className="grid grid-cols-4 gap-4">
                          {service.images?.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Service ${index + 1}`}
                              className="w-full rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          </tbody>
        </table>}
      </div>


      {/* Create/Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onRequestClose={closeModal}
      >
        <h2 className="text-xl font-bold mb-4">
          {selectedService ? "Edit Service" : "Create New Service"}
        </h2>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            placeholder="Give a detailed description of the service"
            className="w-full p-3 border border-gray-300 rounded-lg transition-all"
            rows={10}

          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Images (Upload as Base64)
            </label>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer bg-gray-100 p-2 rounded">
                <FiImage className="inline-block mr-2" />
                Upload Images
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <span>{formData.images.length} images selected</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories?.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded"
              disabled={isCreateLoading || isUpdateLoading}
            >
              Cancel
            </button>
            {
              (isCreateLoading || isUpdateLoading) ? <Spinner /> : <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {selectedService ? "Update Service" : "Create Service"}
              </button>
            }

          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">Are you sure you want to delete this service?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            {
              isDeleteLoading ? <Spinner /> : <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-800"
                disabled={isDeleteLoading}
              >
                Delete
              </button>
            }
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ServiceTable;
