import React, {useState, useRef, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/fa";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef();
    const mobileMenuRef = useRef();
    const linksRef = useRef([]);
    const logoRef = useRef();
    const menuIconRef = useRef();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navLinks = [
        {label: "About Us", path: "/about-us"},
        {label: "Services", path: "/services"},
        {label: "Projects", path: "/project"},
        {label: "Our Team", path: "/our-team"},
        {label: "FAQ", path: "/faq"},
        {label: "Blogs", path: "/blog"},
        {label: "Contact Us", path: "/contact-us"},
    ];

    // Animation for navbar entry
    useGSAP(() => {
        // Navbar slide down animation
        gsap.from(navRef.current, {
            y: -100,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5
        });

        // Logo animation
        gsap.from(logoRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 1
        });

        // Desktop menu items animation
        gsap.from(linksRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.3,
            ease: "back.out(1.2)",
            delay: 1.2
        });

        // Menu icon animation
        gsap.from(menuIconRef.current, {
            opacity: 0,
            rotation: 90,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.8
        });
    }, []);

    return (
        <nav className={`w-full fixed top-0 lg:top-3 z-50`} ref={navRef}>
            <div
                className="max-width backdrop-blur-lg shadow-lg  lg:rounded-lg py-3 flex justify-between items-center bg-black/70">
                {/* Logo with animation ref */}
                <Link
                    to="/"
                    className="text-xl lg:text-2xl font-black font-title text-white uppercase tracking-wide"
                    ref={logoRef}
                >
                    Codabs
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 text-md font-medium text-gray-200">
                    {navLinks.map(({label, path}, index) => (
                        <li key={path}>
                            <Link
                                to={path}
                                ref={el => linksRef.current[index] = el}
                                className={`link_hover font-title text-xl ${location.pathname === path ? "active_link" : ""}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Icon with animation ref */}
                <div
                    className="md:hidden text-xl text-white"
                    onClick={toggleMenu}
                    ref={menuIconRef}
                >
                    {menuOpen ? <FaTimes/> : <FaBars/>}
                </div>
            </div>

            {/* Mobile Menu with animation ref */}
            {menuOpen && (
                <div
                    className="md:hidden bg-black/90 h-screen backdrop-blur-md shadow-md px-4 py-4 space-y-4"
                    ref={mobileMenuRef}
                >
                    {navLinks.map(({label, path}, index) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => {
                                setMenuOpen(false);
                                // Animate each link when clicked
                                gsap.to(mobileMenuRef.current.children[index], {
                                    scale: 0.9,
                                    duration: 0.1,
                                    yoyo: true,
                                    repeat: 1
                                });
                            }}
                            className={`block text-base font-title text-white py-2 px-3 rounded transition-all ${
                                location.pathname === path
                                    ? "active_link bg-white/10"
                                    : "hover:bg-white/5 hover:text-secondary"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
