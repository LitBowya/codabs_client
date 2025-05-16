// ServiceDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { FiSettings, FiList, FiArrowLeft, FiCheckSquare, FiGrid, FiStar } from "react-icons/fi";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";
import AnimatedScrollElement from "../../components/AnimatedScrollElement";
import { useGetServiceByIdQuery } from "../../redux/services/servicesApi.js";
import React from "react";

const ServiceDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetServiceByIdQuery(id);

  const navigate = useNavigate();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  if (isError) return <ErrorMessage message={error?.data?.message || "Failed to load service details"} />;

  const service = data?.service;

  return (
    <div className={`bg-primary`}>
      <div className="max-width py-16 lg:py-28">
        <div className="mb-8 pt-16 lg:pt-24">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 cursor-pointer hover:text-gray-100 mb-8"
          >
            <FiArrowLeft className="mr-2" /> Back to services
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-300">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-secondary-lighter/10 text-secondary px-4 py-2 rounded-full">
                  <FiSettings className="w-5 h-5" />
                  <span className="text-sm font-medium">{service.category[0]?.name}</span>
                </div>
                {service.subcategory[0]?.name && (
                  <div className="flex items-center gap-2 bg-primary/10 text-secondary px-4 py-2 rounded-full">
                    <FiList className="w-5 h-5" />
                    <span className="text-sm font-medium">{service.subcategory[0].name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="prose max-w-none text-gray-300 text-lg leading-relaxed">
              <p>{service.description}</p>
            </div>
          </div>

          <div className="space-y-8">
            {service.images?.length > 0 && (
              <div className="">
                {service.images.map((img, index) => (
                  <AnimatedScrollElement
                    key={index}
                    animationProps={{
                      from: { opacity: 0, scale: 0.9 },
                      to: { opacity: 1, scale: 1 },
                      delay: index * 0.2
                    }}
                  >
                    <div
                      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <img
                        src={img}
                        alt={`Service example ${index + 1}`}
                        className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                    </div>
                  </AnimatedScrollElement>
                ))}
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
