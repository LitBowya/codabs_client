import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiUser, FiCalendar, FiBookOpen, FiArrowLeft, FiTag } from "react-icons/fi";
import { useGetBlogByIdQuery } from "../../redux/services/blogApi";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import AnimatedScrollElement from "../../components/AnimatedScrollElement";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetBlogByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error?.data?.message || "Failed to load blog post"} />;
  }

  const { blog } = data;

  // Injects our image & paragraph classes via regex
  const enhanceContent = (html) =>
    html
      .replace(
        /<img/g,
        `<img class="mx-auto my-8 w-full max-w-3xl rounded-lg shadow-lg transition-shadow hover:shadow-xl"`
      )
      .replace(
        /<p>/g,
        `<p class="text-gray-300 leading-relaxed mb-4 text-lg">`
      )
      .replace(
        /<h1>/g,
        `<h1 class="text-4xl font-bold text-white mt-12 mb-6">`
      )
      .replace(
        /<h2>/g,
        `<h2 class="text-3xl font-semibold text-white mt-10 mb-5">`
      )
      .replace(
        /<h3>/g,
        `<h3 class="text-2xl font-medium text-white mt-8 mb-4">`
      );


  return (
    <div className={`bg-primary`}>
      <div className="max-w-3xl mx-auto py-16 lg:py-28">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 cursor-pointer hover:text-gray-100 mb-8"
        >
          <FiArrowLeft className="mr-2" /> Back to all posts
        </button>

        {/* Cover Image */}
        <AnimatedScrollElement
          animationProps={{
            from: { opacity: 0, y: 20 },
            to: { opacity: 1, y: 0 }
          }}
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full rounded-xl shadow-2xl mb-8 object-center aspect-video max-h-[500px]"
          />
        </AnimatedScrollElement>

        {/* Title & Meta */}
        <h1 className="text-4xl font-bold text-gray-200 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
          <span className="flex items-center gap-1"><FiUser /> {blog.author?.name}</span>
          <span
            className="flex items-center gap-1"><FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          {blog.subcategory?.name && (
            <span className="flex items-center gap-1"><FiBookOpen /> {blog.subcategory.name}</span>
          )}

        </div>
        <div className={`mb-12`}>
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap justify-end gap-3 mt-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm bg-blue-50 text-orange-800 px-3 py-1 rounded-full"
                >
              <FiTag /> {tag}
            </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <article
          className="prose prose-lg prose-gray mx-auto"
          dangerouslySetInnerHTML={{ __html: enhanceContent(blog.content) }}
        />

        {/* Tags */}

      </div>
    </div>
  );
};

export default BlogDetails;
