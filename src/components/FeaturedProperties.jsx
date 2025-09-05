import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchedProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/property/getFeatured`
        );
        setProperties(response.data.properties);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: "Could not fetch properties. Try again!",
        });
      }
    };
    fetchedProperties();
  }, []);

  const protectNavigate = (path) => {
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

    navigate(path);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Featured Properties
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(1, 7).map((property) => (
            <div
              key={property._id}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={property.image}
                alt={property.type}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.type}
                </h3>
                <p className="text-blue-600 text-xl font-bold mt-1">
                  {property.price}
                </p>
                <p className="text-gray-600 mt-1">{property.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => protectNavigate("/all-properties")}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 rounded-full text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
          >
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}
