import React, { useState } from "react";
import { FiSearch, FiChevronDown, FiFilter, FiX } from "react-icons/fi";
import { useGetAllBlogsQuery } from "../../redux/services/blogApi";
import { useGetAllSubcategoriesQuery } from "../../redux/services/subcategoryApi";
import Spinner from "../../components/Spinner";
import EmptyState from "../../components/EmptyState";
import InputField from "../../components/InputField";
import BlogCard from "../../components/User/BlogCard";
import AnimatedScrollElement from "../../components/AnimatedScrollElement";

const Blogg = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [params, setParams] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    category: "",
    subcategory: ""
  });

  const { data, isLoading } = useGetAllBlogsQuery(params);
  const { data: sub } = useGetAllSubcategoriesQuery();

  const subcats = sub?.subcategories;
  const categories = [...new Map(subcats?.map((sc) => [sc.category._id, sc.category])).values()];
  const filteredSubs = subcats?.filter((sc) => sc.category._id === params.category) || [];

  const handleFilterChange = (name, value) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="relative max-width">
      {/* Floating Filter Button */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="fixed bottom-8 right-8 z-30 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary-light transition-all duration-300 flex items-center gap-2 cursor-pointer"
      >
        <FiFilter className="text-xl" />
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
            <h2 className="text-2xl font-bold text-gray-800">Filter Blogs</h2>
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
              label="Search Blogs"
              name="search"
              value={params.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Enter keywords..."
              icon={<FiSearch className="w-5 h-5" />}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
              <select
                value={params.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Subcategory</label>
              <select
                value={params.subcategory}
                onChange={(e) => handleFilterChange("subcategory", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                disabled={!params.category}
              >
                <option value="">All Subcategories</option>
                {filteredSubs.map((sc) => (
                  <option key={sc._id} value={sc._id}>{sc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={params.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="createdAt">Date</option>
                  <option value="title">Title</option>
                </select>
                <select
                  value={params.order}
                  onChange={(e) => handleFilterChange("order", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
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

      {/* Main Content */}
      <div className="">

        <div className="text-center mb-12">
          <div className="w-20 h-1 mx-auto mb-6 bg-secondary"></div>
          <p className="text-lg max-w-3xl mx-auto text-white">
            Dive into our latest articles—packed with expert insights, real-world case studies,
            and actionable tips on architecture, construction, and design. Stay informed,
            inspired, and empowered to bring your next project to life.
          </p>
        </div>

        {!data || data.blogs.length === 0 ? (
          <EmptyState
            title="No Blogs found"
            description="Try adjusting your search filters"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.blogs.map((blog, index) => (
              <AnimatedScrollElement
                key={blog._id}
                animationProps={{
                  from: { opacity: 0, y: 50 },
                  to: {
                    duration: 1,
                    opacity: 1,
                    y: 0,
                    delay: index * 0.2
                  },
                  scrollTrigger: { once: true }
                }}
              >
                {
                  blog.isPublished && (
                    <BlogCard
                      author={blog.author?.name}
                      title={blog.title}
                      coverImage={blog.coverImage}
                      tags={blog.tags}
                      id={blog._id}
                    />
                  )
                }
              </AnimatedScrollElement>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogg;
