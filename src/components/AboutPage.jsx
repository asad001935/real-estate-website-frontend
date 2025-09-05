import React, { useEffect, useState } from "react";
import {
  Users,
  Target,
  Eye,
  CheckCircle,
  Award,
  Home,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

function AboutPage() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(document.getElementById("stats-section"));
  }, []);

  function CountUp({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(counter);
  }, [end, duration]);

  return <span>{count}+</span>;
}


  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Helping people find their dream homes since 2015 🚀
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We are a trusted real estate platform dedicated to connecting
            buyers, sellers, and agents across Pakistan. Since 2015, our mission
            has been to make property transactions simple, transparent, and
            reliable. Whether you're looking for your first home, investment
            opportunities, or a place to grow your business, we’ve got you
            covered.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div className="p-8 bg-gray-100 rounded-2xl shadow-md">
            <Target className="mx-auto md:mx-0 text-blue-600 mb-4" size={40} />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To connect buyers and sellers with trusted real estate
              opportunities, ensuring transparency and satisfaction at every
              step.
            </p>
          </div>

          <div className="p-8 bg-gray-100 rounded-2xl shadow-md">
            <Eye className="mx-auto md:mx-0 text-blue-600 mb-4" size={40} />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most reliable and customer-centric real estate
              platform in Pakistan, empowering people to achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <CheckCircle className="mx-auto text-blue-600 mb-3" size={36} />
              <h4 className="font-semibold">Transparency</h4>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <Users className="mx-auto text-blue-600 mb-3" size={36} />
              <h4 className="font-semibold">Customer Satisfaction</h4>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <Award className="mx-auto text-blue-600 mb-3" size={36} />
              <h4 className="font-semibold">Verified Listings</h4>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <Home className="mx-auto text-blue-600 mb-3" size={36} />
              <h4 className="font-semibold">Professional Support</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="CEO"
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-semibold text-lg">Ahmed Khan</h4>
              <p className="text-gray-500">CEO & Founder</p>
            </div>
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Marketing Lead"
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-semibold text-lg">Sara Ali</h4>
              <p className="text-gray-500">Marketing Lead</p>
            </div>
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
              <img
                src="https://randomuser.me/api/portraits/men/12.jpg"
                alt="Agent"
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-semibold text-lg">Usman Malik</h4>
              <p className="text-gray-500">Senior Agent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="stats-section" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Home className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="text-3xl font-bold"><CountUp end={500}/></h3>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Users className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="text-3xl font-bold"><CountUp end={450}/></h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <Globe className="mx-auto text-blue-600 mb-3" size={40} />
            <h3 className="text-3xl font-bold"><CountUp end={676}/></h3>
            <p className="text-gray-600">Cities Served</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Looking for your dream home?
        </h2>
        <p className="mb-6 text-lg">
          Start exploring thousands of verified listings today!
        </p>
        <Link
          to="/all-properties"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Browse Properties
        </Link>
      </section>
    </>
  );
}

export default AboutPage;
