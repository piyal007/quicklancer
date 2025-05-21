import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-11/12 max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">Oops! The page you're looking for was not found.</p>
            <Link to="/" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
