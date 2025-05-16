// TopProjects.jsx
import React from "react";
import { FiActivity } from "react-icons/fi";

const TopProjects = ({ projects, isLoading, isError }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-end gap-3 mb-6">
        <FiActivity className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Top Viewed Projects</h2>
      </div>

      <div className="space-y-4">
        {projects?.map((item, index) => (
          <div
            key={item._id}
            className="flex items-center gap-4 group cursor-pointer  bg-primary p-3 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-gray-300">
              {index + 1}.
            </span>
            <div className="flex-1">
              <h3 className="font-medium mb-2 text-gray-100">
                {item.project.title}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-300">
                  Views: {item.views}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    item.project.status === "ongoing"
                      ? "bg-blue-100 text-blue-800"
                      : item.project.status === "starting"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.project.status}
                </span>
              </div>
            </div>
            <img
              src={item.project.startingImages[0]}
              alt={item.project.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProjects;
