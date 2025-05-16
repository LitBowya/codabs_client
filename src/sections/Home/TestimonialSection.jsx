import { useGetAllTestimonialsQuery } from "../../redux/services/testimonialApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import AnimatedScrollText from "../../components/AnimatedScrollText.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import TestimonialCard from "../../components/User/TestimonialCard.jsx";
import ServiceCard from "../../components/User/ServiceCard.jsx";
import AnimatedScrollElement from "../../components/AnimatedScrollElement.jsx";

const TestimonialSection = () => {
  const { data, isLoading, isError } = useGetAllTestimonialsQuery();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const testimonials = data?.testimonials || [];


  return (
    <section className="bg-primary border-r-[10px] md:border-r-[15px] border-orange-500 py-24">
      <div className="max-width">
        <div className="mb-12 text-end">
          <AnimatedScrollText
            types="chars"
            tagName="h4"
            className={`tag text-white`}
          >
            Trust, Truth, Testimony
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
            Client Experiences That Define Us
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
            Our reputation is built not only with concrete and steel, but with the words of clients whose expectations
            we've exceeded.
          </AnimatedScrollText>
        </div>

        {testimonials.length === 0 ? (

          <EmptyState title="No testimonials found" />

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <AnimatedScrollElement
                key={testimonial._id}
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
                <TestimonialCard testimonial={testimonial} />
              </AnimatedScrollElement>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default TestimonialSection;
