// ContactUs.jsx
import React from "react";
import SectionHero from "../../components/User/SectionHero.jsx";
import AppointmentForm from "../../sections/ContactUs/AppointmentForm.jsx";
import ContactForm from "../../sections/ContactUs/ContactForm.jsx";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const ContactUs = () => {
  return (
    <div className="bg-primary">
      <SectionHero
        tags="Get in Touch, Support, Inquiry"
        title="Let’s Build Something Together"
        subtitle="Ready to start a project or have questions? Reach out and let's talk about how we can help."
        imageUrl="/images/construction.jpg"
        pattern="dots"
      />

      <div className="max-width lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <FiMapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Office Address</h3>
                    <p className="text-gray-600">123 Construction Lane<br />Builders City, BC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <FiPhone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Numbers</h3>
                    <p className="text-gray-600">
                      Office: (123) 456-7890<br />
                      Mobile: (098) 765-4321
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <FiMail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <p className="text-gray-600">
                      info@construction.com<br />
                      support@construction.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-200 rounded-lg">
                    <FiClock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Working Hours</h3>
                    <p className="text-gray-600">
                      Mon-Fri: 8:00 AM - 6:00 PM<br />
                      Sat: 9:00 AM - 3:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-12">
            <AppointmentForm />
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <iframe
            title="Office Location"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-0.12345678901234567!3d51.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA3JzI0LjQiTiAwwrAwNyczOC40Ilc!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
