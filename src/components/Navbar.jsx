import React, { useState, useEffect, useRef } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavbar from "./AdminNavbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const discoverRef = useRef(null);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Load user role on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role) setRole(storedUser.role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRole(null);
    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "Please login again.",
      showConfirmButton: false,
      timer: 2000,
    });
    navigate("/");
    window.location.reload();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (discoverRef.current && !discoverRef.current.contains(e.target))
        setIsDiscoverOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsDiscoverOpen(false);
    setIsProfileOpen(false);
  };

  // Admin view
  if (role === "admin") {
    return <AdminNavbar onLogout={handleLogout} />;
  }

  return (
    <header>
      <nav
        className="w-full fixed top-0 left-0 z-50 shadow-md"
        style={{
          background:
            "linear-gradient(90deg, #f1f5ff 0%, #edf2ff 50%, #f9faff 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <img src={logo} alt="Logo" className="h-14 w-auto rounded-md" />
            <div className="hidden md:block">
              <div className="font-bold text-primary text-lg">MyEstate</div>
              <div className="text-gray-500 text-sm -mt-1">
                Properties & Listings
              </div>
            </div>
          </Link>

          {/* Mobile menu toggle */}
          {/* Mobile menu toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ Prevent outside handler from firing
              setIsOpen(!isOpen);
            }}
            className="md:hidden w-12 h-12 flex items-center justify-center border rounded-md shadow-sm"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Links */}
          <div
            ref={mobileRef}
            className={`${
              isOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full md:static md:block md:w-auto bg-white md:bg-transparent border-t md:border-none shadow-md md:shadow-none`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-1 px-4 md:px-0">
              <li>
                <Link to="/" onClick={handleLinkClick} className="py-2 px-4">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/main-about"
                  onClick={handleLinkClick}
                  className="py-2 px-4"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/all-properties"
                  onClick={handleLinkClick}
                  className="py-2 px-4"
                >
                  Properties
                </Link>
              </li>

              {/* Discover dropdown */}
              <li className="relative" ref={discoverRef}>
                <button
                  onClick={() => setIsDiscoverOpen(!isDiscoverOpen)}
                  className="flex items-center py-2 px-4"
                >
                  Discover
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDiscoverOpen && (
                  <ul className="md:absolute bg-white shadow-lg rounded-md mt-2 py-2 w-40">
                    <li>
                      <Link
                        to="/featured-properties"
                        onClick={handleLinkClick}
                        className="px-4 py-2 block"
                      >
                        Featured
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/neighbourhoods"
                        onClick={handleLinkClick}
                        className="px-4 py-2 block"
                      >
                        Neighborhoods
                      </Link>
                    </li>
                    <li>
                      <hr className="my-1 border-gray-200" />
                    </li>
                    <li>
                      <Link
                        to="/agentsPage"
                        onClick={handleLinkClick}
                        className="px-4 py-2 block"
                      >
                        Agents
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="py-2 px-4"
                >
                  Contact
                </Link>
              </li>

              {/* ✅ Show Login/Register inside mobile menu if not logged in */}
              {/* ✅ Show Login/Register inside mobile menu if not logged in */}
              {!token && (
                <div className="flex flex-col gap-2 mt-3 md:hidden">
                  <Link
                    to="/login"
                    className="border border-blue-600 text-blue-600 px-3 py-2 rounded-md text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 mb-4 text-white px-3 py-2 rounded-md text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Profile / Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!token && (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}
            {token && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center"
                >
                  U
                </button>
                {isProfileOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                    <li>
                      <Link
                        to="/profile"
                        onClick={handleLinkClick}
                        className="px-4 py-2 block"
                      >
                        Profile
                      </Link>
                    </li>

                    {/* Users cannot see any switch button */}
                    <li>
                      <hr className="my-1 border-gray-200" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-red-600 block w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
