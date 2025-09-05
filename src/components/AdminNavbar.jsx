import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../images/logo.png";

export default function AdminNavbar({ onSwitchUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const mobileRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setIsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleConvertToUser = () => {
    if (onSwitchUser) {
      onSwitchUser();
    } else {
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      navigate("/");
      window.location.reload();
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Swal.fire({
        icon: "success",
        title: "Logged out Successfully!",
        text: "You have to login again to continue.",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <header>
      <nav
        className="w-full fixed top-0 left-0 z-50 shadow-md"
        style={{
          background: "linear-gradient(90deg, #f1f5ff 0%, #edf2ff 50%, #f9faff 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={handleLinkClick}>
            <img src={logo} alt="Logo" className="h-12 w-auto rounded-md" />
            <div className="hidden md:block">
              <div className="font-bold text-primary text-lg">Admin Panel</div>
              <div className="text-gray-500 text-sm -mt-1">Manage Properties</div>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 flex items-center justify-center border rounded-md shadow-sm"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> 
                       : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            ref={mobileRef}
            className={`${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full md:static md:block md:w-auto bg-white md:bg-transparent border-t md:border-none shadow-md md:shadow-none`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-6 px-4 md:px-0">
              <li>
                <Link to="/add-property" onClick={handleLinkClick} className="block py-2 px-4 text-gray-700 hover:text-blue-600 font-medium">
                  Add Property
                </Link>
              </li>
              <li>
                <Link to="/all-properties" onClick={handleLinkClick} className="block py-2 px-4 text-gray-700 hover:text-blue-600 font-medium">
                  View All Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6b7280" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fillRule="evenodd" d="M8 9a5 5 0 0 0-4.546 2.916A.5.5 0 0 0 3.5 12h9a.5.5 0 0 0 .046-.084A5 5 0 0 0 8 9z" />
              </svg>
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                <li>
                  <Link to="/profile" onClick={handleLinkClick} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleConvertToUser} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Convert to User
                  </button>
                </li>
                <li><hr className="my-1 border-gray-200" /></li>
                <li>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
