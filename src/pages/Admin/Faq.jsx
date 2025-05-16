import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation
} from "../../redux/services/faqApi";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState.jsx";

const FaqManager = () => {
  const { data: faqs, isLoading, isError, refetch } = useGetAllFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "", isVisible: true });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFaq) {
        await updateFaq({ id: selectedFaq._id, ...formData }).unwrap();
        toast.success("FAQ updated successfully");
      } else {
        await createFaq(formData).unwrap();
        toast.success("FAQ created successfully");
      }
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFaq(selectedFaq._id).unwrap();
      toast.success("FAQ deleted successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Deletion failed");
    }
  };

  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      isVisible: faq.isVisible
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (faq) => {
    setSelectedFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedFaq(null);
    setFormData({ question: "", answer: "", isVisible: true });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message="Failed to load FAQs" />;

  return (
    <div className="max-width">
      <div className={`bg-white p-4 rounded-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">FAQs Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded flex items-center"
          >
            <FiPlus className="mr-2" /> Add FAQ
          </button>
        </div>


        {faqs?.faqs?.length === 0 ? (
          <EmptyState
            title="No FAQs found"
            description="You haven't created any frequently asked questions yet."
          />
        ) : (
          <div className="space-y-2">
            {faqs?.faqs?.map(faq => (
              <div key={faq._id} className="rounded-lg">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
                >
                  <div className="flex items-center space-x-3">
                <span
                  className={`text-sm px-2 py-1 rounded ${faq.isVisible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {faq.isVisible ? "Visible" : "Hidden"}
                </span>
                    <h3 className="font-medium">{faq.question}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(faq);
                      }}
                      className="text-blue-500 cursor-pointer hover:text-blue-700"
                    >
                      <FiEdit size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(faq);
                      }}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      <FiTrash size={24} />
                    </button>
                    {expandedId === faq._id ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                  </div>
                </div>

                {expandedId === faq._id && (
                  <div className="p-4 border-t">
                    <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}


      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          {selectedFaq ? "Edit FAQ" : "Create New FAQ"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            required
          />

          <label className={`block text-sm font-medium text-gray-700 mb-1`}>Answer</label>
          <textarea name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    rows={10}

                    className="w-full border border-gray-300 rounded-md p-2"
                    required />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isVisible"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor="isVisible" className="text-sm">
              Visible to users
            </label>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded cursor-pointer"
              disabled={isCreating || isUpdating}
            >
              Cancel
            </button>
            

            {(isCreating || isUpdating) ? <Spinner /> : <button
              type="submit"
              className="px-4 py-2 bg-primary cursor-pointer hover:bg-blue-600 text-white rounded flex items-center"
              disabled={isCreating || isUpdating}
            >
              {selectedFaq ? (
                "Update FAQ"
              ) : (
                "Create FAQ"
              )}
            </button>}
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">Are you sure you want to delete this FAQ?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner size={20} color="#ffffff" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FaqManager;
