import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen mt-10 bg-gray-100 flex flex-col items-center justify-center text-gray-800">
    <div className="text-center p-8 max-w-md">
      <h1 className="text-6xl font-bold text-sky-500 mb-2">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8">
        We're sorry, the page you requested could not be found. Please check the URL or navigate back to the homepage.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button 
          className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <Link 
          to="/"
          className="px-6 py-2 bg-white border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors"
        >
          Homepage
        </Link>
      </div>
    </div>
    
    <div className="mt-12 relative">
      <div className="text-9xl font-bold text-sky-100">404</div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg className="w-24 h-24 text-sky-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
  )
}
