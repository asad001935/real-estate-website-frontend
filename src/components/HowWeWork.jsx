import React from 'react'
import { ClipboardList, Search, Home, Handshake } from 'lucide-react'

function HowWeWork() {
  return (
    <>
      <section className="bg-gray-200 w-full mt-6 py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="heading mb-12">
            <h1 className="font-bold text-3xl text-center">How It Works</h1>
            <p className="text-center text-gray-600 mt-2">
              Simple steps to find your dream property with us
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <Search className="w-12 h-12 mx-auto text-blue-500" />
              <h2 className="font-semibold text-lg mt-4">1. Search Property</h2>
              <p className="text-gray-600 mt-2">
                Explore verified listings and choose your ideal location.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <ClipboardList className="w-12 h-12 mx-auto text-green-500" />
              <h2 className="font-semibold text-lg mt-4">2. Compare & Select</h2>
              <p className="text-gray-600 mt-2">
                Check property details, compare prices, and shortlist.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <Home className="w-12 h-12 mx-auto text-red-500" />
              <h2 className="font-semibold text-lg mt-4">3. Visit & Finalize</h2>
              <p className="text-gray-600 mt-2">
                Schedule a visit and finalize the property with confidence.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
              <Handshake className="w-12 h-12 mx-auto text-purple-500" />
              <h2 className="font-semibold text-lg mt-4">4. Easy Process</h2>
              <p className="text-gray-600 mt-2">
                Complete the paperwork smoothly with our trusted agents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowWeWork
