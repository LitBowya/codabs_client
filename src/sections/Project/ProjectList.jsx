import React, { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import InputField from "../../components/InputField.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";
import ProjectCard from "../../components/User/ProjectCard.jsx";

const ProjectList = ({ projects, categories, filters, onFilterChange }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="relative max-width">
      {/* Floating Filter Button */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="fixed bottom-8 right-8 z-30 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary-light transition-all duration-300 flex items-center gap-2 cursor-pointer"
      >
        <FiFilter className="text-xl" />
        {/*<span className="hidden sm:inline">Filters</span>*/}
      </button>

      {/* Overlay */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      {/* Filters Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isFiltersOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Filter Projects</h2>
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="text-2xl text-gray-600" />
            </button>
          </div>

          {/* Filters Content */}
          <div className="flex-1 overflow-y-auto space-y-6">
            <InputField
              label="Search Projects"
              name="search"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              placeholder="Enter keywords..."
              className="bg-gray-50"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Project Category</label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange("category", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
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
              <label className="block text-sm font-medium text-gray-700 mb-3">Project Status</label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              >
                <option value="">All Statuses</option>
                <option value="starting">Upcoming</option>
                <option value="ongoing">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <InputField
              label="Location"
              name="location"
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              placeholder="Enter location..."
              className="bg-gray-50"
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={filters.startDateAfter}
                  onChange={(e) => onFilterChange("startDateAfter", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
                <input
                  type="date"
                  value={filters.startDateBefore}
                  onChange={(e) => onFilterChange("startDateBefore", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                checked={filters.hasFinishedImages === "true"}
                onChange={(e) => onFilterChange("hasFinishedImages", e.target.checked ? "true" : "")}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Show Only Projects with Completed Images
              </label>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setIsFiltersOpen(false)}
            className="mt-6 w-full bg-secondary hover:bg-secondary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="">
        <div className="text-center mb-12">
          <div className="w-20 h-1 mx-auto mb-6 bg-secondary"></div>
          <p className="text-lg max-w-3xl mx-auto text-white">
            Our services encompass expert consultancy, innovative architectural design, and high-quality
            construction
            — all tailored to bring your vision to life with precision, creativity, and care.
          </p>
        </div>
        {projects.length === 0 ? (
          <EmptyState title="No projects found" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <AnimatedScrollElement
                key={project._id}
                animationProps={{
                  from: { opacity: 0, y: 50 },
                  to: {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    delay: index * 0.5
                  },
                  scrollTrigger: { once: true }
                }}
              >
                <ProjectCard project={project} index={index} />
              </AnimatedScrollElement>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
