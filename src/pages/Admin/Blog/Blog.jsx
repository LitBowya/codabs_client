import React, {useState} from "react";
import {
    FiPlus,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiCalendar,
    FiArrowUp,
    FiArrowDown,
    FiFilter, FiChevronDown
} from "react-icons/fi";
import {useGetAllBlogsQuery, useDeleteBlogMutation} from "../../../redux/services/blogApi";
import {useGetAllSubcategoriesQuery} from "../../../redux/services/subcategoryApi";
import Spinner from "../../../components/Spinner";
import EmptyState from "../../../components/EmptyState";
import BlogForm from "./BlogForm";
import BlogAccordion from "./BlogAccordion";
import InputField from "../../../components/InputField";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import {toast} from "react-toastify";

const Blog = () => {
    const [openBlogId, setOpenBlogId] = useState(null);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        order: "desc",
        category: "",
        subcategory: "",
        tags: ""
    });
    const {data, isLoading, refetch} = useGetAllBlogsQuery(params);
    const [deleteBlog, {isLoading: isDeleting}] = useDeleteBlogMutation();
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const {data: sub} = useGetAllSubcategoriesQuery();
    const subcats = sub?.subcategories;
    const categories = [...new Map(subcats?.map((sc) => [sc.category._id, sc.category])).values()];
    const filteredSubs = subcats?.filter((sc) => sc.category._id === params.category) || [];

    // Search and filter handlers
    const handleSearch = e => setParams(p => ({...p, search: e.target.value, page: 1}));
    const handleFilter = e => setParams(p => ({...p, [e.target.name]: e.target.value, page: 1}));

    // Sorting handlers
    const handleSortBy = e => setParams(p => ({...p, sortBy: e.target.value, page: 1}));
    const handleSortOrder = e => setParams(p => ({...p, order: e.target.value, page: 1}));

    const handlePage = newPage => setParams(p => ({...p, page: newPage}));

    const openCreate = () => {
        setEditData(null);
        setModalOpen(true);
    };
    const openEdit = blog => {
        setEditData(blog);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id).unwrap();
            toast.success("Blogs deleted successfully");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to delete blog");
        } finally {
            setDeleteId(null);
        }
    };

    if (isLoading) return <Spinner/>;

    return (
        <div className="max-width">
            <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                {/* Search and Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    {/* Search Input */}
                    <div className="md:col-span-2 relative">
                        <FiSearch className="absolute left-3 top-3 w-5 h-5 text-gray-500"/>
                        <InputField
                            placeholder="Search blogs..."
                            value={params.search}
                            onChange={handleSearch}
                            className="pl-10 pr-4 w-full h-11 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <FiFilter className="absolute left-3 top-3  w-5 h-5 text-gray-500"/>
                        <select
                            name="category"
                            value={params.category}
                            onChange={handleFilter}
                            className="pl-10 pr-8 w-full h-11 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none hover:bg-gray-50 transition-all"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        <FiChevronDown
                            className="absolute right-3 top-4  w-4 h-4 text-gray-400 pointer-events-none"/>
                    </div>

                    {/* Subcategory Filter */}
                    <div className="relative">
                        <FiFilter className="absolute left-3 top-3  w-5 h-5 text-gray-500"/>
                        <select
                            name="subcategory"
                            value={params.subcategory}
                            onChange={handleFilter}
                            className="pl-10 pr-8 w-full h-11 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none hover:bg-gray-50 transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                            disabled={!params.category}
                        >
                            <option value="">All Subcategories</option>
                            {filteredSubs.map((sc) => (
                                <option key={sc._id} value={sc._id}>{sc.name}</option>
                            ))}
                        </select>
                        <FiChevronDown
                            className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none"/>
                    </div>

                    {/* Sorting Controls */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                            <select
                                value={params.sortBy}
                                onChange={handleSortBy}
                                className="pl-10 pr-8 w-full h-11 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none hover:bg-gray-50 transition-all"
                            >
                                <option value="createdAt">Date</option>
                                <option value="title">Title</option>
                            </select>
                            <FiChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
                        </div>

                        <div className="relative flex-1">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                {params.order === "desc" ? (
                                    <FiArrowDown className="w-5 h-5 text-gray-500"/>
                                ) : (
                                    <FiArrowUp className="w-5 h-5 text-gray-500"/>
                                )}
                            </div>
                            <select
                                value={params.order}
                                onChange={handleSortOrder}
                                className="pl-10 pr-8 w-full h-11 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none hover:bg-gray-50 transition-all"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                            <FiChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
                        </div>
                    </div>
                </div>

                {/* Create Button */}
                <div className="flex justify-end">
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 bg-primary cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        <FiPlus/> New Blogs
                    </button>
                </div>

                {/* Blogs List */}
                {!data || data.blogs.length === 0 ? (
                    <EmptyState
                        title="No Blogs found"
                        description="Try adjusting your search filters or create a new blog"
                    />
                ) : (
                    <div className="space-y-3">
                        {data.blogs.map((blog) => (
                            <BlogAccordion
                                key={blog._id}
                                blog={blog}
                                isOpen={openBlogId === blog._id}
                                onToggle={() => setOpenBlogId(prev => prev === blog._id ? null : blog._id)}
                                onEdit={() => openEdit(blog)}
                                onDelete={() => setDeleteId(blog._id)}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={() => handlePage(params.page - 1)}
                        disabled={params.page === 1}
                        className="btn-outline flex items-center gap-2"
                    >
                        <FiChevronLeft/> Previous
                    </button>

                    <span className="text-gray-600">
            Page {params.page} of {data?.pages || 1}
          </span>

                    <button
                        onClick={() => handlePage(params.page + 1)}
                        disabled={params.page >= (data?.pages || 1)}
                        className="btn-outline flex items-center gap-2"
                    >
                        Next <FiChevronRight/>
                    </button>
                </div>

                <BlogForm
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        refetch();
                    }}
                    initialData={editData}
                />

                <DeleteConfirmationModal
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    onConfirm={() => handleDelete(deleteId)}
                    title="Delete Blogs"
                    description="Are you sure you want to delete this blog? This action cannot be undone."
                    isLoading={isDeleting}
                />
            </div>
        </div>
    );
};

export default Blog;
