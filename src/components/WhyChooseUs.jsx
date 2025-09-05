import {
  ShieldCheck,
  MapPin,
  DollarSign,
  FileCheck,
  MoveRight,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function WhyChooseUs() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const MoveToAbout = () => {
    navigate("main-about");
  };
  const highlights = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "Trusted Agents",
      desc: "Work with reliable and experienced agents.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-blue-600" />,
      title: "Verified Locations",
      desc: "All properties are in secure and verified areas.",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-blue-600" />,
      title: "Affordable Prices",
      desc: "Get the best deals at competitive rates.",
    },
    {
      icon: <FileCheck className="w-10 h-10 text-blue-600" />,
      title: "Easy Process",
      desc: "Simple steps to buy, rent, or sell properties.",
    },
  ];

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
          if (result.isConfirmed) navigate("/login");
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
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    navigate(path);
  };
  return (
    <section className="py-16 bg-gray-50 mt-5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Link
          onClick={(e) => protectNavigate(e, "main-about")}
          className="group bg-gradient-to-br from-blue-600 to-blue-200 py-2 px-4 rounded-full cursor-pointer text-white font-bold flex items-center gap-1"
        >
          More about us
          <MoveRight className="transform transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </section>
  );
}
