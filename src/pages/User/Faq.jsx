import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiHelpCircle, FiMinus } from "react-icons/fi";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHero from "../../components/User/SectionHero.jsx";
import { useGetAllFaqsQuery } from "../../redux/services/faqApi.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import EmptyState from "../../components/EmptyState.jsx";

gsap.registerPlugin(ScrollTrigger);

const FaqItem = ({ faq, isOpen, onClick }) => {
  const answerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (answerRef.current) {
      gsap.to(answerRef.current, {
        duration: 0.3,
        height: isOpen ? "auto" : 0,
        ease: "power2.inOut",
        overwrite: true
      });
    }
  }, [isOpen]);

  return (
    <div className="group bg-secondary rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={onClick}
        className="flex items-center w-full p-6 text-left space-x-4 hover:bg-secondary-light cursor-pointer rounded-xl transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex-shrink-0 text-primary">
          {isOpen ? (
            <FiMinus className="w-6 h-6" />
          ) : (
            <FiHelpCircle className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary pr-4">
            {faq.question}
          </h3>
        </div>

        <FiChevronDown
          className={`flex-shrink-0 w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={answerRef}
        className="overflow-hidden h-0 bg-white rounded-b-xl"
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="py-6 px-6">
          <div className="pl-10 relative">
            <div className="absolute left-0 top-2 text-3xl text-primary font-bold">“</div>
            <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-primary">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Faqs = () => {
  const { data, isLoading, isError } = useGetAllFaqsQuery();
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.from(itemsRef.current, {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center"
      }
    });
  }, []);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  const faqs = data?.faqs || [];

  return (
    <div className="bg-primary" ref={containerRef}>
      <SectionHero
        tags="Questions, Support, Info"
        title="Frequently Asked Questions"
        subtitle="Have questions? Find clear answers about our services, processes, and what to expect when working with us."
        imageUrl="/images/construction.jpg"
        pattern="grid"
      />

      <div className="max-width py-24 lg:py-48">
        <div className="text-center mb-12">
          <div className="w-20 h-1 mx-auto mb-6 bg-secondary"></div>
          <p className="text-lg max-w-3xl mx-auto text-white">
            Have questions? We've compiled answers to the most common inquiries about our services, process, and what to
            expect when working with us. If you need more help, don’t hesitate to reach out.
          </p>
        </div>

        {faqs.length === 0 ? <EmptyState title="No faqs" /> : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={faq._id}
                ref={el => itemsRef.current[index] = el}
              >
                <FaqItem
                  faq={faq}
                  isOpen={activeIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faqs;
