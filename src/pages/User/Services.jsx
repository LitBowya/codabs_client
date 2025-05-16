import React from "react";
import SectionHero from "../../components/User/SectionHero.jsx";
import ServiceSection from "../../sections/Home/ServiceSection.jsx";
import AnimatedScrollText from "../../components/AnimatedScrollText.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";
import ServiceCard from "../../components/User/ServiceCard.jsx";
import { useGetAllServicesQuery } from "../../redux/services/servicesApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";


const Services = () => {
  const { data, isLoading, isError } = useGetAllServicesQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const services = data?.services || [];
  return (
    <div>
      <SectionHero
        tags="What We Do, Solutions, Expertise"
        title="Comprehensive Construction Services"
        subtitle="From planning to project delivery, we offer end-to-end construction solutions built on experience and precision."

        imageUrl="/images/construction.jpg"
        pattern="grid"
      />
      <section className={`bg-primary py-24 lg:py-48`}>
        <div className="max-width">
          <div className="text-center mb-12">
            <div className="w-20 h-1 mx-auto mb-6 bg-secondary"></div>
            <p className="text-lg max-w-3xl mx-auto text-white">
              Our services encompass expert consultancy, innovative architectural design, and high-quality construction
              — all tailored to bring your vision to life with precision, creativity, and care.
            </p>
          </div>
          {services.length === 0 ? (
            <EmptyState title="No services found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <AnimatedScrollElement
                  key={service._id}
                  animationProps={{
                    from: { opacity: 0, y: 50 },
                    to: {
                      duration: 1,
                      opacity: 1,
                      y: 0,
                      delay: index * 0.5 // Stagger delay based on index
                    },
                    scrollTrigger: {
                      once: true // Only animate once
                    }
                  }}
                >
                  <ServiceCard service={service} index={index} />
                </AnimatedScrollElement>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
export default Services;
