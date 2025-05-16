import SectionHero from "../../components/User/SectionHero.jsx";
import { FaHardHat, FaTools, FaBuilding, FaMedal, FaUsers } from "react-icons/fa";
import { GiHouseKeys, GiProgression } from "react-icons/gi";


const AboutUs = () => {
  const primaryColor = "oklch(21% 0.034 264.665)"; // Dark color
  const secondaryColor = "oklch(70.5% 0.213 47.604)"; // Accent color

  const features = [
    {
      icon: <FaHardHat className="text-3xl" style={{ color: secondaryColor }} />,
      title: "Expert Team",
      description: "Our skilled professionals bring decades of combined experience to every project."
    },
    {
      icon: <FaTools className="text-3xl" style={{ color: secondaryColor }} />,
      title: "Quality Craftsmanship",
      description: "We use premium materials and proven techniques for lasting results."
    },
    {
      icon: <FaBuilding className="text-3xl" style={{ color: secondaryColor }} />,
      title: "Diverse Projects",
      description: "From residential to commercial, we handle projects of all sizes."
    },
    {
      icon: <GiHouseKeys className="text-3xl" style={{ color: secondaryColor }} />,
      title: "Turnkey Solutions",
      description: "Complete project management from concept to completion."
    }
  ];

  return (
    <div>
      <SectionHero
        tags="About Us, Our Story, Trusted Builders"
        title="Built on Trust, Driven by Excellence"
        subtitle="With decades of experience, we turn your vision into reality through craftsmanship, quality, and integrity."
        imageUrl="/images/construction.jpg"
        pattern="bricks"
      />
      <section
        className="py-32 lg:py-56"
        style={{ backgroundColor: primaryColor, color: "white" }}
      >
        <div className="max-width">
          <div className="text-center mb-12">
            <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: secondaryColor }}></div>
            <p className="text-lg max-w-3xl mx-auto">
              We are a full-service construction firm dedicated to delivering exceptional quality, innovative solutions,
              and unparalleled customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
              <p className="mb-4">
                Founded by John Smith in 1995 as a small residential contractor, we've grown into a premier construction
                company serving the entire region. What began as a one-man operation has blossomed into a team of over
                50 dedicated professionals.
              </p>
              <p>
                Throughout our journey, we've maintained our commitment to integrity, craftsmanship, and building
                relationships that last longer than our structures.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Our Approach</h3>
              <div className="flex items-start mb-4">
                <GiProgression className="text-2xl mr-3 mt-1" style={{ color: secondaryColor }} />
                <div>
                  <h3 className="font-medium">Innovative Processes</h3>
                  <p>We combine traditional craftsmanship with modern technology for efficient, high-quality
                    results.</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <FaUsers className="text-2xl mr-3 mt-1" style={{ color: secondaryColor }} />
                <div>
                  <h3 className="font-medium">Client-Centric</h3>
                  <p>Your vision is our blueprint. We prioritize clear communication and collaboration.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMedal className="text-2xl mr-3 mt-1" style={{ color: secondaryColor }} />
                <div>
                  <h3 className="font-medium">Proven Excellence</h3>
                  <p>Award-winning projects and 95% client satisfaction rate speak to our quality.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: secondaryColor }}>{feature.title}</h3>
                <p className={`text-black`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutUs;
