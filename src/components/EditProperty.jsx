import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  // Refs to select text on focus
  const priceRef = useRef(null);
  const locationRef = useRef(null);
  const imageRef = useRef(null);

  // Fetch property details on component mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://illustrious-enthusiasm-production.up.railway.app/api/property/getProperty/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const property = response.data.property;
        setType(property.type);
        setPrice(property.price);
        setLocation(property.location);
        setImage(property.image);
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch property details.", "error");
      }
    };
    fetchProperty();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
       `https://illustrious-enthusiasm-production.up.railway.app/api/property/editProperty/${id}`,
        { type, price, location, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success!", "Property updated successfully.", "success");
      navigate("/all-properties"); // Redirect after update
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Property
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select type</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="plot">Plot</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              ref={priceRef}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter property price"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              ref={locationRef}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter property location"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Image (URL)
            </label>
            <input
              type="text"
              value={image}
              ref={imageRef}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL here"
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={() => {
                // Reset all fields
                setType("");
                setPrice("");
                setLocation("");
                setImage("");
              }}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
