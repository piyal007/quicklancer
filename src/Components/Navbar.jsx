import React, { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-50 shadow-md">
        <div className="w-11/12 mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="nav-left">
              <h2 className="cursor-pointer text-2xl md:text-3xl font-bold font-rancho">QuickLancer</h2>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex-1 md:flex justify-center">
              <div className="nav-middle space-x-4 *:font-semibold *:text-gray-700 *:hover:text-gray-900 *:transition-colors">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/addtask">Add-Task</NavLink>
                <NavLink to="/addtask">Browse-Tasks</NavLink>
                <NavLink to="/addtask">My-Posted-Tasks</NavLink>
              </div>
            </div>
            <div className="hidden md:flex items-center *:font-semibold">
              <div className="nav-right space-x-4 *:font-semibold">
                <NavLink to="/signin" className="btn text-gray-700 hover:text-gray-900 transition-colors">Sign In</NavLink>
                <NavLink to="/signup" className="btn text-gray-700 px-4 py-2 rounded-lg transition-colors">Sign Up</NavLink>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col space-y-3 *:font-semibold *:text-gray-700 *:hover:text-gray-900 *:transition-colors">
              <NavLink to="/" className="block">Home</NavLink>
              <NavLink to="/addtask" className="block">Add-Task</NavLink>
              <NavLink to="/addtask" className="block">Browse-Tasks</NavLink>
              <NavLink to="/addtask" className="block">My-Posted-Tasks</NavLink>
              <hr className="border-gray-300 my-2" />
              <NavLink to="/signin" className="btn">Sign In</NavLink>
              <NavLink to="/signup" className="btn px-4 py-2 rounded-lg transition-colors">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
