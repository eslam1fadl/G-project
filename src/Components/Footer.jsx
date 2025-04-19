import React from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const hiddenRoutes = [
    "/admin",
    "/admin/chats",
    "/admin/patients",
    "/admin/users",
    "/admin/AddDoctors",
    "/admin/Addcity"
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#199ED3] text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-5 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Dr Home</h2>
          <p className="mb-6">
            Providing quality healthcare services in the comfort of your home. 
            We are committed to excellence in patient care and satisfaction.
          </p>
          <div className="flex mt-5 space-x-3">
            <a href="#" aria-label="Facebook" className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white hover:text-[#199ED3] transition-colors duration-300">
              <Facebook />
            </a>
            <a href="#" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white hover:text-[#199ED3] transition-colors duration-300">
              <Linkedin />
            </a>
            <a href="#" aria-label="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white hover:text-[#199ED3] transition-colors duration-300">
              <Twitter />
            </a>
            <a href="#" aria-label="Instagram" className="flex items-center justify-center w-10 h-10 rounded-full border border-white hover:bg-white hover:text-[#199ED3] transition-colors duration-300">
              <Instagram />
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
          <h3 className="text-lg font-semibold mb-5 relative after:block after:w-24 after:h-0.5 after:bg-white after:mt-2">
            Our Services
          </h3>
          <ul className="space-y-2">
            {["Home Doctor Visits", "Medical Consultations", "Laboratory Tests", "Nursing Care", "Physiotherapy"].map((service, index) => (
              <li key={`service-${index}`}>
                <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
          <h3 className="text-lg font-semibold mb-5 relative after:block after:w-24 after:h-0.5 after:bg-white after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
  <li>
    <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
      About Us
    </a>
  </li>
  <li>
    <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
      Our Doctors
    </a>
  </li>
  <li>
    <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
      Book Appointment
    </a>
  </li>
  <li>
    <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
      FAQ
    </a>
  </li>
  <li>
    <a href="#" className="hover:underline transition-opacity duration-300 hover:opacity-80">
      Blog
    </a>
  </li>
</ul>

        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 px-4">
          <h3 className="text-lg font-semibold mb-5 relative after:block after:w-24 after:h-0.5 after:bg-white after:mt-2">
            Contact Us
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="mr-3 ml-2 mt-1 " />
              <p>123 Medical Street, Healthcare City, 12345</p>
            </div>
            <div className="flex items-start">
              <Phone className="mr-3 ml-2 mt-1 " />
              <p>+1 (800) 123-4567</p>
            </div>
            <div className="flex items-start">
              <Mail className="mr-3 ml-2 mt-1 " />
              <p>contact@drhome.com</p>
            </div>
          </div>
        </div>

        <div className="w-full text-center mt-8 pt-8 border-t border-white/20">
          &copy; {currentYear} Dr Home. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}