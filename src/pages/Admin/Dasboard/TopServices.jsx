// TopServices.jsx
import React from "react";
import { FiBriefcase } from "react-icons/fi";

const TopServices = ({ services, isLoading, isError }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-end gap-3 mb-6">
        <FiBriefcase className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Top Viewed Services</h2>
      </div>

      <div className="space-y-4">
        {services?.map((item, index) => (
          <div
            key={item._id}
            className="flex items-center gap-4 group bg-primary p-3 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-gray-300">
              {index + 1}.
            </span>
            <div className="flex-1">
              <h3 className="font-medium mb-2 text-gray-100">
                {item.service.title}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-300">
                  Views: {item.views}
                </span>

              </div>
            </div>
            <img
              src={item.service.images[0]}
              alt={item.service.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
