import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="admin-nav fixed  w-full top-0 right-0 z-50 bg-gray-800 text-white border-0 border-none shadow-none shadow-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle Menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
              </svg>
            </button>
            
            <Link to="/" className="flex ms-5 md:me-24">
              <span className="logo-admin self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Dr Home</span>
            </Link>
            
           
          </div>
          
        
        </div>
        
        {menuOpen && (
          <div className="md:hidden mt-3 w-full">
            <ul className="flex flex-col space-y-2 py-2 px-4 bg-gray-700 rounded-lg">
              <li>
                <Link className="block py-2 text-lg font-semibold text-white hover:bg-gray-600 rounded px-2" to={''}>General</Link>
              </li>
              <li>
                <Link className="block py-2 text-lg font-semibold text-white hover:bg-gray-600 rounded px-2" to={'doctors'}>Doctors</Link>
              </li>
              <li>
                <Link className="block py-2 text-lg font-semibold text-white hover:bg-gray-600 rounded px-2" to={'Patients'}>Patients</Link>
              </li>
              <li>
                <Link className="block py-2 text-lg font-semibold text-white hover:bg-gray-600 rounded px-2" to={'chats'}>Chats</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}