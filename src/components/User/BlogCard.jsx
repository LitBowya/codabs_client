import AnimatedScrollElement from "../AnimatedScrollElement";
import {FiBookOpen, FiUser, FiArrowRight} from "react-icons/fi";
import {Link} from "react-router-dom";

const BlogCard = ({author, title, coverImage, tags, id}) => {
    return (
        <div
            className="group relative h-[400px] shadow-sm shadow-orange-500 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 ease-out">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-center transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"/>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-200 cursor-pointer"
                        >
              #{tag}
            </span>
                    ))}
                </div>

                {/* Title */}
                <h3
                    className="text-xl lg:text-2xl font-bold mb-2 leading-tight transition-all duration-300 group-hover:translate-y-[-5px]">
                    {title}
                </h3>

                {/* Author & Read More */}
                <div
                    className="flex items-end justify-between opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-start gap-2">
                        <div>
                            <span className="text-sm md:text-md font-bold italic text-gray-500">author</span>
                        </div>
                        <div className={`flex items-center gap-2`}>
                            <FiUser className="w-5 h-5"/>
                            <span className="font-medium text-sm md:text-md">{author}</span>
                        </div>
                    </div>
                    <Link
                        to={`/blog/${id}`}
                        className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 bg-secondary backdrop-blur-sm rounded-full transition-all duration-200"
                    >
                        Read Article
                        <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                    </Link>
                </div>

                {/* Hover Book Icon */}
                <div
                    className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiBookOpen className="w-6 h-6"/>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
