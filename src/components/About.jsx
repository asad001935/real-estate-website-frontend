import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroSectionImg from "../images/hero-section.jpg";
import "../app.css";
import Swal from "sweetalert2";
import axios from "axios";

function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/property/getFeatured",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProperties(response.data.properties);
      } catch (error) {
        Swal.fire("Error", "Could not load properties.", "error");
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Not Logged In",
        text: "You need to log in to continue.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    setIsSearched(true);
    if (searchTerm.trim() === "") {
      setFilteredProperties([]);
      return;
    }

    const result = properties.filter(
      (p) =>
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(result);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6"
      style={{ backgroundImage: `url(${heroSectionImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg animate-fadeIn mb-8">
          Find Your <span className="text-blue-400">Dream Home</span>
        </h1>

        <div className="w-full bg-white rounded-lg shadow-lg flex items-center px-4 py-2 gap-3 animate-fadeIn">
          <label htmlFor="search" className="sr-only">
            Search properties
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          <input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search properties, cities..."
            className="flex-1 px-2 py-2 outline-none text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition shadow-md"
          >
            Search
          </button>
        </div>

        {isSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <img
                    src={p.image}
                    alt={p.type}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-bold mt-2">{p.type}</h3>
                  <p className="text-gray-600">{p.location}</p>
                  <p className="text-blue-600 font-semibold">{p.price}</p>
                </div>
              ))
            ) : (
              <p className="text-white text-lg col-span-full">
                No properties found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default About;
