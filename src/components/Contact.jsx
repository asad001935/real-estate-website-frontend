import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

function Contact() {
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token"); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target; 
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      if (token) { 
        await axios.post("http://localhost:5000/api/inquiry/createInquiry", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Inquiry added successfully to backend.");
      }

    
      const response = await fetch("https://formspree.io/f/meolerye", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        form.reset();
        Swal.fire("Success!", "Message sent successfully.", "success");
      } else {
        setStatus("Failed to send message via Formspree.");
        Swal.fire("Error!", "Failed to send message via Formspree.", "error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Error sending message.");
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
    }
  };

  const protectNavigate = (e, path) => {
    const token = localStorage.getItem("token");

    if (e && typeof e.preventDefault === "function") {
      if (!token) {
        e.preventDefault();
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
          if (result.isConfirmed) window.location.href = "/login";
        });
      }
      return;
    }

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
        if (result.isConfirmed) window.location.href = "/login";
      });
      return;
    }

    window.location.href = path;
  };

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left side */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about buying or selling property? We're here to help you.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">
              📍 <span className="font-semibold">Office:</span> 123 Real Estate Street, Lahore, Pakistan
            </p>
            <p className="text-gray-700">
              📞 <span className="font-semibold">Phone:</span> +92 300 1234567
            </p>
            <p className="text-gray-700">
              📧 <span className="font-semibold">Email:</span> support@realestate.com
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://api.whatsapp.com/send/?phone=923296021819&text=Hello%2C+I+want+to+contact+you+about+your+property%21&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => protectNavigate(e, "")}
              className="px-5 cursor-pointer flex py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              <FaWhatsapp className="me-2" size={20} color="white" /> Contact Us
            </a>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to="/login"
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to="/register"
              className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a message</h3>

          <form id="contactForm" className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              onClick={(e) => protectNavigate(e, "")}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          {status && <p className="text-center mt-3 text-sm">{status}</p>}
        </div>
      </div>
    </section>
  );
}

export default Contact;
