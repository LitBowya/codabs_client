import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle, FaCog, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLogoutMutation } from "../../redux/services/authApi.js";
import { logout } from "../../redux/slices/authSlice.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (e) {
      toast.error(e.data?.message || e.message || "Failed to logout");
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
          closeDropdown();
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-primary p-4 shadow-md">
      <div className="flex justify-end">
        <div className="relative">
          {/* User Profile Button */}
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none group"
          >
            <FaUserCircle
              size={32}
              className="text-white hover:text-gray-200 transition-colors hover:cursor-pointer"
            />
            {isDropdownOpen ? (
              <FiChevronUp className="text-white hidden md:inline-block" />
            ) : (
              <FiChevronDown className="text-white hidden md:inline-block" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-30 py-1"
              onMouseLeave={closeDropdown}
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.name || "Welcome"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <Link
                to="/admin/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={closeDropdown}
              >
                <FaUser className="mr-2 text-gray-500" />
                Profile
              </Link>

              <div className="border-t border-gray-100"></div>

              <Link
                to="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={closeDropdown}
              >
                <FaHome className="mr-2 text-green-500" />
                Go Home
              </Link>

              <div className="border-t border-gray-100"></div>

              <p
                className="flex cursor-pointer items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
