import React, { useState } from "react";
import {
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation
} from "../../../redux/services/subcategoryApi.js";
import { useGetAllCategoriesQuery } from "../../../redux/services/categoryApi.js";
import InputField from "../../../components/InputField";
import Modal from "../../../components/Modal";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import EmptyState from "../../../components/EmptyState.jsx";


const SubCategoryTable = ({
                            subcategories = [],
                            isLoading,
                            isError,
                            refetch
                          }) => {
  const [createSubcategory] = useCreateSubcategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form states
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open edit modal with subcategory data
  const handleEditClick = (subcategory) => {
    setCurrentSubcategory(subcategory);
    setFormData({
      name: subcategory.name,
      description: subcategory.description,
      categoryId: subcategory.category?._id || ""
    });
    setIsEditModalOpen(true);
  };

  // Handle create subcategory
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createSubcategory(formData).unwrap();
      toast.success("Subcategory created successfully");
      setIsCreateModalOpen(false);
      refetch();
      setFormData({ name: "", description: "", categoryId: "" });
    } catch (error) {
      toast.error(error.data?.message || "Failed to create subcategory");
    }
  };

  // Handle update subcategory
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateSubcategory({
        id: currentSubcategory._id,
        ...formData
      }).unwrap();
      toast.success("Subcategory updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update subcategory");
    }
  };

  // Handle delete subcategory
  const handleDelete = async () => {
    try {
      await deleteSubcategory(currentSubcategory._id).unwrap();
      toast.success("Subcategory deleted successfully");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete subcategory");
    }
  };

  if (isLoading) return <div>Loading subcategories...</div>;
  if (isError) return <div>Error loading subcategories</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Subcategories</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Subcategory
        </button>
      </div>

      <div className="overflow-x-auto">
        {subcategories.length === 0 ? <EmptyState
          title="No Subcategories found"
          description="You haven't created any subcategories yet."
        /> : <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {subcategories?.map((subcategory) => (
            <tr key={subcategory._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-md font-medium text-gray-900">{subcategory.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-md text-gray-500 truncate max-w-xs">{subcategory.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-md text-gray-900">{subcategory.category?.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(subcategory)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <FiEdit2 size={24} />
                </button>
                <button
                  onClick={() => {
                    setCurrentSubcategory(subcategory);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>}
      </div>

      {/* Create Subcategory Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}

      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Create New Subcategory</h3>

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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select a category</option>
                {categories?.categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-blue-700"
              >
                Create Subcategory
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit Subcategory Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}

      >
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Edit Subcategory</h3>
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select a category</option>
                {categories?.categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer text-white rounded-md hover:bg-blue-700"
              >
                Update Subcategory
              </button>
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
            <h3 className="text-lg font-medium">Delete Subcategory</h3>

          </div>
          <p className="mb-6">Are you sure you want to delete "{currentSubcategory?.name}"? This action cannot be
            undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
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

export default SubCategoryTable;
