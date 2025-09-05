import React from 'react'

function Testimonial() {
  return (
    <>
      <section className="bg-gray-100 py-12 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <img 
                src="https://tse4.mm.bing.net/th/id/OIF.JCLP4FVPIwBPoKIoHSQmpA?pid=Api&P=0&h=220" 
                alt="Ali" 
                className="mx-auto rounded-full mb-4 w-24 h-24 object-cover"
              />
              <p className="italic">“I found my dream house in just 2 weeks!”</p>
              <h3 className="mt-4 font-semibold">Ali</h3>
              <span className="text-gray-500">Lahore</span>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <img 
                src="https://tse4.mm.bing.net/th/id/OIP.qoYAtMHPmfj456F_25b01wHaJM?pid=Api&P=0&h=220" 
                alt="Sara" 
                className="mx-auto rounded-full mb-4 w-24 h-24 object-cover"
              />
              <p className="italic">“The process was smooth and stress-free.”</p>
              <h3 className="mt-4 font-semibold">Sara</h3>
              <span className="text-gray-500">Karachi</span>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <img 
                src="https://i.pinimg.com/originals/26/8e/76/268e76ab1ba7b628c4aeb561b05d04e8.jpg" 
                alt="Usman" 
                className="mx-auto rounded-full mb-4 w-24 h-24 object-cover"
              />
              <p className="italic">“Great service, I highly recommend them.”</p>
              <h3 className="mt-4 font-semibold">Usman</h3>
              <span className="text-gray-500">Islamabad</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial
