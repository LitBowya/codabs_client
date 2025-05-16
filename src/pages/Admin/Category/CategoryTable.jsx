import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "../../../redux/services/categoryApi"; // Update to your correct API service
import InputField from "../../../components/InputField";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import EmptyState from "../../../components/EmptyState.jsx";

const CategoryTable = ({ categories, isLoading, isError, refetch }) => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Open edit modal with category data
  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setIsEditModalOpen(true);
  };

  // Handle create category
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCategory(formData).unwrap();
      toast.success("Category created successfully");
      setFormData({
        name: "",
        description: ""
      });
      setIsCreateModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to create category");
    }
  };

// Handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCategory({
        id: currentCategory._id,
        name: formData.name,
        description: formData.description
      }).unwrap();
      toast.success("Category updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update category");
    }
  };


  // Handle delete category
  const handleDelete = async () => {
    try {
      await deleteCategory(currentCategory._id).unwrap();
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete category");
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        {categories.length === 0 ? <EmptyState
          title="No Categories found"
          description="You haven't created any categories yet."
        /> : <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {categories?.map((category) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{category.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-blue-600 cursor-pointer hover:text-blue-900 mr-4"
                >
                  <FiEdit2 size={24} />
                </button>
                <button
                  onClick={() => {
                    setCurrentCategory(category);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600 cursor-pointer  hover:text-red-900"
                >
                  <FiTrash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>}
      </div>

      {/* Create Category Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Create New Category</h3>
          </div>
          <form onSubmit={handleCreate}>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-blue-700"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Edit Category</h3>

          </div>
          <form onSubmit={handleUpdate}>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-blue-700"
              >
                Update Category
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Category Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-red-600">Delete Category</h3>

          </div>
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryTable;
