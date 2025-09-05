import React from 'react'
import { Link } from 'react-router-dom'

function CallingBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-indigo-800 text-white py-16 px-6 text-center rounded-2xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to buy or sell property?
      </h2>
      <p className="text-lg mb-6">
        Join us today and make your real estate journey simple and secure!
      </p>
      <Link to="/login"  onClick={() => window.scrollTo(0, 0)} className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition">
        Get Started
      </Link>
    </section>
  )
}

export default CallingBanner
