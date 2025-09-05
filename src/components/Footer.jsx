import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white">RealEstatePro</h2>
          <p className="mt-4 text-sm">
            Helping you find your dream home with ease and trust. 
            Your journey to a perfect property starts here.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/" className="hover:text-white">Home</Link></li>
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/main-about" className="hover:text-white">About Us</Link></li>
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/featured-properties" className="hover:text-white">Properties</Link></li>
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 123 Main Street, Lahore, Pakistan</li>
            <li>📞 +92 300 1234567</li>
            <li>📧 info@realestatepro.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RealEstatePro. All rights reserved.
      </div>
    </footer>
  )
}
