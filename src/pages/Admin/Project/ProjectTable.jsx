import React, { useState, useEffect } from "react";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} from "../../../redux/services/projectApi.js";
import InputField from "../../../components/InputField";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import Modal from "../../../components/Modal";
import { format, parseISO } from "date-fns";
import EmptyState from "../../../components/EmptyState.jsx";

const ProjectTable = ({
                        projects,
                        categories,
                        subcategories,
                        pagination,
                        filters,
                        onFilterChange,
                        onPageChange,
                        refetch
                      }) => {
  const [createProject, {
    isLoading: isCreating,
    isError: isCreateError,
    error: createError
  }] = useCreateProjectMutation();
  const [updateProject, {
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError
  }] = useUpdateProjectMutation();
  const [deleteProject, {
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteProjectMutation();

  // Reset error states when closing modals
  const resetStates = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    // Mutation resets
    createProject.reset();
    updateProject.reset();
    deleteProject.reset();
  };


  // Modal and form states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "ongoing",
    tags: "",
    startingImages: [],
    finishedImages: []
  });

  // Filtered subcategories based on selected category
  const filteredSubcategories = subcategories.filter(
    sub => sub.category._id === formData.category
  );

  // Handle image upload
  const handleImageUpload = async (files, field) => {
    const images = await Promise.all(
      Array.from(files).map(file => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      }))
    );
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ...images] }));
  };

  // Handle form submissions
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      };

      await createProject(payload).unwrap();
      toast.success("Project created successfully");
      setIsCreateModalOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        subcategory: "",
        location: "",
        startDate: "",
        endDate: "",
        status: "ongoing",
        tags: "",
        startingImages: [],
        finishedImages: []
      });
      resetStates();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to create project");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null
      };

      await updateProject({
        id: currentProject._id,
        projectData: payload
      }).unwrap();
      toast.success("Project updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update project");
    }
  };

  // Initialize form data when editing
  useEffect(() => {
    if (currentProject) {
      setFormData({
        title: currentProject.title,
        description: currentProject.description,
        category: currentProject.category?._id || "",
        subcategory: currentProject.subcategory?._id || "",
        location: currentProject.location,
        startDate: currentProject.startDate.split("T")[0],
        endDate: currentProject.endDate?.split("T")[0] || "",
        status: currentProject.status,
        tags: currentProject.tags?.join(", ") || "",
        startingImages: currentProject.startingImages || [],
        finishedImages: currentProject.finishedImages || []
      });
    }
  }, [currentProject]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filter Controls */}
      <div className="p-4 space-y-4 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Search"
            name="search"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">All Statuses</option>
              <option value="starting">Starting</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputField
            label="Location"
            name="location"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start After</label>
            <input
              type="date"
              value={filters.startDateAfter}
              onChange={(e) => onFilterChange("startDateAfter", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Before</label>
            <input
              type="date"
              value={filters.startDateBefore}
              onChange={(e) => onFilterChange("startDateBefore", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.hasFinishedImages === "true"}
                onChange={(e) => onFilterChange("hasFinishedImages", e.target.checked ? "true" : "")}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Has Finished Images</span>
            </label>
          </div>
        </div>
      </div>


      {/* Projects Table */}
      <div className="overflow-x-auto">
        <div className={`my-2 flex justify-end mx-5`}>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FiPlus /> Add Project
          </button>
        </div>
        {projects.length === 0 ? <EmptyState
          title="No Projects found"
          description="You haven't created any project yet."
        /> : <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {projects.map(project => (
            <tr key={project._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.title}</div>

              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{project.category?.name}</div>
                {project.subcategory && (
                  <div className="text-sm text-gray-500">{project.subcategory.name}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === "completed" ? "bg-green-100 text-green-800" :
                      project.status === "ongoing" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                  }`}>
                    {project.status}
                  </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(parseISO(project.startDate), "PP")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => {
                    setCurrentProject(project);
                    setIsEditModalOpen(true);
                  }}
                  className="text-blue-600 cursor-pointer hover:text-blue-900 mr-4"
                >
                  <FiEdit2 size={24} />
                </button>
                <button
                  onClick={() => {
                    setCurrentProject(project);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600 cursor-pointer hover:text-red-900"
                >
                  <FiTrash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="text-sm text-gray-700">
          Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
          {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{" "}
          {pagination.totalItems} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 border rounded-md hover:bg-primary hover:text-white cursor-pointer disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <span className="px-3 py-1">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="px-3 py-1 hover:bg-primary hover:text-white cursor-pointer border rounded-md disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Create/Edit Project Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onRequestClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
        }}
      >
        <div className="">
          {isCreateError && (
            <ErrorMessage message={createError?.data?.message || "Failed to create project"} />
          )}
          {isUpdateError && (
            <ErrorMessage message={updateError?.data?.message || "Failed to update project"} />
          )}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {isCreateModalOpen ? "Create New Project" : "Edit Project"}
            </h3>
          </div>

          <form onSubmit={isCreateModalOpen ? handleCreate : handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />


              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full border rounded-md p-2"
                  disabled={!formData.category}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map(subcategory => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <InputField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              <InputField
                label="End Date (optional)"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-md p-2 mb-4"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="starting">Starting</option>
                </select>

                <InputField
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className=""
                />
              </div>


              <div className={`col-span-2`}>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Describe the entirety of the project)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={10}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>


              {/* Image Uploads */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Starting Images</label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files, "startingImages")}
                    className="hidden"
                    id="startingImages"
                  />
                  <label
                    htmlFor="startingImages"
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50"
                  >
                    <FiImage className="inline mr-2" /> Upload Images
                  </label>
                  {formData.startingImages?.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt="" className="h-20 w-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          startingImages: prev.startingImages.filter((_, i) => i !== index)
                        }))}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Finished Images</label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files, "finishedImages")}
                    className="hidden"
                    id="finishedImages"
                  />
                  <label
                    htmlFor="finishedImages"
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50"
                  >
                    <FiImage className="inline mr-2" /> Upload Images
                  </label>
                  {formData.finishedImages?.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt="" className="h-20 w-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          finishedImages: prev.finishedImages.filter((_, i) => i !== index)
                        }))}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              {isCreating || isUpdating ? <Spinner /> : <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700"
              >
                {isCreateModalOpen ? "Create Project" : "Update Project"}

              </button>}
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="">

          <div className="flex justify-between items-center mb-4">
            {isDeleteError && (
              <ErrorMessage message={deleteError?.data?.message || "Failed to delete project"} />
            )}
            <h3 className="text-lg font-medium text-red-600">Delete Project</h3>
          </div>
          <p className="mb-4">Are you sure you want to delete "{currentProject?.title}"?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            {isDeleting ? <Spinner /> : <button
              disabled={isDeleting}
              onClick={async () => {
                try {
                  await deleteProject(currentProject._id).unwrap();
                  toast.success("Project deleted successfully");
                  setIsDeleteModalOpen(false);
                  refetch();
                } catch (error) {
                  toast.error(error.data?.message || "Failed to delete project");
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectTable;
