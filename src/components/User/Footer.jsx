import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary border-t-[10px] md:border-t-[15px] border-orange-500 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Codabs</h1>
            <p className="text-gray-300">
              Building innovative solutions for tomorrow's challenges.
            </p>
            <div className="flex space-x-4 text-xl">
              <Link to="#" className="hover:text-accent transition-colors">
                <FaFacebook />
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                <FaTwitter />
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                <FaInstagram />
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                <FaLinkedin />
              </Link>
              <Link to="#" className="hover:text-accent transition-colors">
                <FaGithub />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/about-us" className="hover:text-accent transition-colors">About</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/project" className="hover:text-accent transition-colors">Projects</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/our-team" className="hover:text-accent transition-colors">Our Team</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/blog" className="hover:text-accent transition-colors">Blogs</Link></li>
              <li className={`hover:text-secondary cursor-pointer hover:underline`}><Link
                to="/contact-us" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MdLocationOn className="text-xl mt-1" />
                <p>123 Tech Street, Silicon Valley, CA 94000</p>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail />
                <Link to="mailto:info@codabs.com" className="hover:text-accent transition-colors">info@codabs.com</Link>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone />
                <Link to="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Codabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
