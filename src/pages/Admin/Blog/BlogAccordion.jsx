// BlogAccordion.jsx
import React from "react";
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";

const BlogAccordion = ({ blog, isOpen, onToggle, onEdit, onDelete }) => (
  <div className=" rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow">
    <div
      className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
      onClick={onToggle}
    >
      <div className="flex items-center gap-4 flex-1">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-20 rounded-full "
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            {blog.isPublished && (
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                Published
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <span className="mr-3">Author: {blog.author?.name}</span>
            <span>Category: {blog.category?.name}</span>
          </div>
          {blog.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 hover:bg-gray-200 rounded-full text-gray-600 hover:text-blue-600"
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 hover:bg-gray-200 rounded-full text-gray-600 hover:text-red-600"
        >
          <FiTrash2 size={18} />
        </button>
        <span className="text-gray-400">
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </span>
      </div>
    </div>

    {isOpen && (
      <div className="p-4 border-t">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    )}
  </div>
);

export default BlogAccordion;
