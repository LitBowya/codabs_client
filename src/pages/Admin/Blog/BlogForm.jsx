import React, {useState, useRef, useEffect} from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import InputField from "../../../components/InputField";
import ErrorMessage from "../../../components/ErrorMessage";
import {
    useCreateBlogMutation,
    useUpdateBlogMutation
} from "../../../redux/services/blogApi";
import {useGetAllSubcategoriesQuery} from "../../../redux/services/subcategoryApi";
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner.jsx";

const BlogForm = ({isOpen, onClose, initialData}) => {
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        tags: "",
        category: "",
        subcategory: "",
        coverImagePreview: null,
        coverImageFile: null,
        content: "",
        isPublished: false
    });
    const [error, setError] = useState("");
    const quillRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: "75vw",
        height: "100vh"
    });
    const [isResizing, setIsResizing] = useState(false);
    const [resizeType, setResizeType] = useState("");
    const sidebarRef = useRef(null);
    const startX = useRef(0);
    const startY = useRef(0);
    const startWidth = useRef(0);
    const startHeight = useRef(0);

    const {data: sub} = useGetAllSubcategoriesQuery();
    const subcats = sub?.subcategories;
    const categories = [
        ...new Map(subcats?.map((sc) => [sc.category._id, sc.category])).values()
    ];
    const filteredSubs =
        subcats?.filter((sc) => sc.category._id === formData.category) || [];

    const [createBlog, {isLoading: isCreateBlogLoading}] = useCreateBlogMutation();
    const [updateBlog, {isLoading: isUpdateBlogLoading}] = useUpdateBlogMutation();

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                excerpt: initialData.excerpt,
                tags: initialData.tags?.join(", ") || "",
                category: initialData.category?._id || "",
                subcategory: initialData.subcategory?._id || "",
                coverImagePreview: initialData.coverImage,
                coverImageFile: null,
                content: initialData.content,
                isPublished: initialData.isPublished || false
            });
        }
    }, [initialData]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX.current;
            const deltaY = e.clientY - startY.current;

            if (resizeType === "right") {
                const newWidth = startWidth.current - deltaX;
                setDimensions((prev) => ({
                    ...prev,
                    width: `${Math.max(300, newWidth)}px`
                }));
            } else if (resizeType === "bottom") {
                const newHeight = startHeight.current - deltaY;
                setDimensions((prev) => ({
                    ...prev,
                    height: `${Math.max(500, newHeight)}px`
                }));
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setResizeType("");
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, resizeType]);

    const startResizing = (type, e) => {
        setIsResizing(true);
        setResizeType(type);
        startX.current = e.clientX;
        startY.current = e.clientY;
        startWidth.current = sidebarRef.current.offsetWidth;
        startHeight.current = sidebarRef.current.offsetHeight;
    };

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, "image", reader.result);
                quill.setSelection(range.index + 1);
            };
            reader.readAsDataURL(file);
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{header: [1, 2, 3, 4, false]}],
                [{font: []}, {size: []}],
                ["bold", "italic", "underline", "strike"],
                [{color: []}, {background: []}],
                [{script: "sub"}, {script: "super"}],
                [{align: []}, {direction: "rtl"}],
                [
                    {list: "ordered"},
                    {list: "bullet"},
                    {indent: "-1"},
                    {indent: "+1"}
                ],
                ["blockquote", "code-block", "link", "image", "divider"],
                ["clean", "redo"],
                ["undo"]
            ],
            handlers: {
                image: imageHandler,
                divider: function () {
                    const quill = this.quill;
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, "divider", true, "user");
                },
                undo: function () {
                    this.quill.history.undo();
                },
                redo: function () {
                    this.quill.history.redo();
                }
            }
        },
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    };

    // Add these formats to your Quill editor configuration
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "align",
        "direction",
        "indent",
        "list",
        "bullet",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
        "divider",
        "undo",
        "redo"
    ];

    const handleChange = (name, value) => {
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    coverImagePreview: reader.result,
                    coverImageFile: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.title ||
            !formData.excerpt ||
            !formData.content ||
            !formData.category
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            let coverBase64 = formData.coverImagePreview;
            if (formData.coverImageFile) {
                coverBase64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(formData.coverImageFile);
                });
            }

            const payload = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                coverImage: coverBase64
            };

            if (initialData) {
                await updateBlog({id: initialData._id, data: payload}).unwrap();
                toast.success("Blogs updated successfully");
            } else {
                await createBlog(payload).unwrap();
                toast.success("Blogs created successfully");
            }
            onClose();
        } catch (err) {
            setError(err.data?.message || "Failed to save blog.");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={sidebarRef}
            className="fixed inset-y-0 right-0 w-3/4 bg-white shadow-lg z-50 overflow-auto resize-both"
            style={{
                width: dimensions.width,
                height: dimensions.height,
                minWidth: "300px",
                minHeight: "500px"
            }}
        >
            {/* Resize Handles */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-200"
                onMouseDown={(e) => startResizing("right", e)}
            />
            <div
                className="absolute bottom-0 left-0 right-0 h-1 cursor-row-resize hover:bg-blue-200"
                onMouseDown={(e) => startResizing("bottom", e)}
            />

            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                    {initialData ? "Edit Blogs" : "New Blogs"}
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && <ErrorMessage message={error}/>}
                <div className={`flex justify-end`}>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => handleChange("isPublished", e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label>Publish Immediately</label>
                    </div>
                </div>

                <InputField
                    label="Title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <InputField
                    label="Excerpt (A brief intro about the blog)"
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    textarea
                />

                <div>
                    <label className="block mb-2 font-medium">Cover Image *</label>
                    <InputField
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="block w-full"
                    />
                    {formData.coverImagePreview && (
                        <img
                            src={formData.coverImagePreview}
                            alt="Cover preview"
                            className="mt-4 max-h-48 rounded-full"
                        />
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">Category *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Subcategory</label>
                        <select
                            value={formData.subcategory}
                            onChange={(e) => handleChange("subcategory", e.target.value)}
                            className="w-full p-2 border rounded"
                            disabled={!formData.category}
                        >
                            <option value="">Select Subcategory</option>
                            {filteredSubs.map((sc) => (
                                <option key={sc._id} value={sc._id}>
                                    {sc.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <InputField
                    label="Tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                />

                <div className={`mb-4 pb-5 sticky top-10 min-h-[400px]`}>
                    <label className="block mb-2 font-medium">Content *</label>
                    <ReactQuill
                        theme="snow"
                        ref={quillRef}
                        value={formData.content}
                        onChange={(content) => handleChange("content", content)}
                        modules={modules}
                        formats={formats}
                        className="rounded-lg h-full"
                    />
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Close
                    </button>
                    {(isCreateBlogLoading || isUpdateBlogLoading) ? <Spinner/> : <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {initialData ? "Update Blogs" : "Create Blogs"}
                    </button>}
                </div>
            </form>
        </div>
    );
};

// Add these CSS styles
<style jsx>{`
  .cursor-col-resize {
    cursor: col-resize;
  }

  .cursor-row-resize {
    cursor: row-resize;
  }

  .resize-active {
    user-select: none;
    -webkit-user-select: none;
  }
`}</style>;

export default BlogForm;
