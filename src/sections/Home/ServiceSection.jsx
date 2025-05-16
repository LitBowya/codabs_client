import ServiceCard from "../../components/User/ServiceCard.jsx";
import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { useGetAllServicesQuery } from "../../redux/services/servicesApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import AnimatedScrollText from "../../components/AnimatedScrollText.jsx";
import SectionBackground from "../../components/User/SectionBackground.jsx";

const ServiceSection = () => {
  const { data, isLoading, isError } = useGetAllServicesQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const services = data?.services || [];

  return (
    <section className="relative bg-primary border-r-[10px] md:border-r-[15px] border-orange-500 py-24 lg:py-48">
      <SectionBackground
        elementCount={15}
        colors={["#FF6B6B40", "#4ECDC440", "#55627040"]}
        shapes={["circle", "triangle", "wave"]}
        pattern="wave"
        mouseIntensity={25}
        blurAmount={3}
      />
      <div className="max-width">
        <div className="mb-12 text-end">
          <AnimatedScrollText
            types="chars"
            tagName="h4"
            className={`tag text-white`}
          >
            Excellence, Efficiency, Execution
          </AnimatedScrollText>
          <AnimatedScrollText
            types="chars"
            tagName="h2"
            animationProps={
              {
                opacity: 0,
                ease: "power1.inOut",
                stagger: 0.1
              }
            }
            className={`title text-secondary lowercase`}
          >
            Expert Construction Services
          </AnimatedScrollText>

          <AnimatedScrollText
            types="chars"
            tagName="p"
            animationProps={
              {
                opacity: 0,
                rotationZ: 50,
                ease: "power1.inOut",
                stagger: 0.1
              }
            }
            className={`subtitle`}
          >
            Our services encompass every facet of construction, delivering resilient structures that exemplify
            precision, durability, and visionary craftsmanship.
          </AnimatedScrollText>
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
  );
};

export default ServiceSection;
