import Navbar from './components/Navbar'
import About from './components/About';
import FeaturedProperties from './components/FeaturedProperties';
import WhyChooseUs from './components/WhyChooseUs';
import HowWeWork from './components/HowWeWork';
import Testimonial from './components/Testimonial';
import CallingBanner from './components/CallingBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import AboutPage from './components/AboutPage';
import AllProperties from './components/AllProperties';
import Neighbourhoods from './components/Neighbourhoods';
import AgentsPage from './components/AgentPage';
import AdminNavbar from './components/AdminNavbar';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';

function Home() {
  return (
    <>
      <About />
      <FeaturedProperties />
      <WhyChooseUs />
      <HowWeWork />
      <Testimonial />
      <CallingBanner />
      <Contact />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {/* <AdminNavbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main-about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-properties" element={<AllProperties />} />
        <Route path="/featured-properties" element={<FeaturedProperties />} />
        <Route path="/neighbourhoods" element={<Neighbourhoods />} />
        <Route path="/agentsPage" element={<AgentsPage />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />




      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
