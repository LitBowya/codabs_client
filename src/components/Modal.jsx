// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onRequestClose}
    >
      <div
        className="
              bg-white rounded-lg p-6 min-w-[720px] max-w-4xl max-h-[540px] relative
              overflow-y-auto no-scrollbar
            "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-4 hover:text-gray-700 cursor-pointer text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
