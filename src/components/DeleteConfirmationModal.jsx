// DeleteConfirmationModal.jsx
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";
import Spinner from "./Spinner.jsx";

const DeleteConfirmationModal = ({
                                   isOpen,
                                   onClose,
                                   onConfirm,
                                   title,
                                   description,
                                   isLoading
                                 }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center p-6">
      <div className="flex justify-center text-red-600 mb-4">
        <FiAlertTriangle size={48} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <Spinner size="small" />}
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmationModal;
