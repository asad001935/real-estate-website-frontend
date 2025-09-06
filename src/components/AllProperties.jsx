import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AllProperties() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `https://illustrious-enthusiasm-production.up.railway.app/api/property/getAllProperty`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProperties(response.data.properties);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: "Could not fetch your properties. Try again!",
        });
        setLoading(false);
      }
    };
    fetchProperties();
  }, [token]);

  // Delete property
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://illustrious-enthusiasm-production.up.railway.app/api/property/deleteProperty/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProperties(properties.filter((p) => p._id !== id));
      Swal.fire("Deleted!", "Property has been deleted.", "success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete",
        text: "Can't delete property. Try again!",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  const handleInquiry = (id) => {
    navigate(`/contact`);
  };

  if (loading) {
    return (
       <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
    </div>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          All Available Houses
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, visibleCount).map((property) => (
            <div
              key={property._id}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.type}
                loading="lazy"
                className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />

              {/* Property Info */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.type}
                </h3>
                <p className="text-blue-600 text-xl font-bold mt-1">
                  {property.price}
                </p>
                <p className="text-gray-600 mt-1">{property.location}</p>

                {/* Buttons */}
                {user?.role === "admin" ? (
                  <div className="flex gap-3 justify-center mt-4">
                    <button
                      onClick={() => handleEdit(property._id)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInquiry(property._id)}
                    className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
                  >
                    Any Inquiry? Click
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Load More Button */}
          {visibleCount < properties.length && (
            <div className="flex justify-center items-center col-span-full">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="mt-6 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg"
              >
                Load More...
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loader Styles */}
      <style>{`
        .loader {
          border-top-color: #3490dc;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default AllProperties;
