import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary-dark p-4 shadow-lg text-white text-center mt-auto">
            <span className="text-secondary-dark text-sm">
          © {new Date().getFullYear()} Codabs Constructions Dashboard
        </span>
        </footer>
    );
};

export default Footer;
