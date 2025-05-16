// TopBlogs.jsx
import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { format } from "date-fns";

const TopBlogs = ({ blogs, isLoading, isError }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-end gap-3 mb-6">
        <FiTrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Top Viewed Blogs</h2>
      </div>

      <div className="space-y-4">
        {blogs?.map((item, index) => (
          <div key={item._id}
               className="flex items-center gap-4 group bg-primary cursor-pointer p-3 rounded-lg transition-colors">
            <span className="text-sm font-medium text-gray-300">{index + 1}.</span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-100 mb-2">{item.blog.title}</h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-300">
                  Views: {item.views}
                </span>
                <span className="text-sm text-gray-300">
                  {format(new Date(item.blog.createdAt), "PP")}
                </span>
              </div>
            </div>
            <img
              src={item.blog.coverImage}
              alt={item.blog.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBlogs;
