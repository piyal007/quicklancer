import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error signing out: " + error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-50 shadow-md z-50">
        <div className="w-11/12 mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="nav-left">
              <h2 className="cursor-pointer text-2xl md:text-3xl font-bold font-rancho">
                QuickLancer
              </h2>
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
                <NavLink to="/browsetask">Browse-Tasks</NavLink>
                <NavLink to="/mypostedtask">My-Posted-Tasks</NavLink>
              </div>
            </div>
            <div className="hidden md:flex items-center *:font-semibold">
              <div className="nav-right space-x-4 *:font-semibold">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="relative group z-50">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/G2jQXGk/default-avatar.png"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                      />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-max">
                        {user.displayName}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <>
                    <NavLink
                      to="/signin"
                      className="btn text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="btn text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pt-4`}>
            <div className="flex flex-col space-y-3 *:font-semibold *:text-gray-700 *:hover:text-gray-900 *:transition-colors">
              <NavLink to="/" className="block">
                Home
              </NavLink>
              <NavLink to="/addtask" className="block">
                Add-Task
              </NavLink>
              <NavLink to="/browsetask" className="block">
                Browse-Tasks
              </NavLink>
              <NavLink to="/mypostedtask" className="block">
                My-Posted-Tasks
              </NavLink>
              <hr className="border-gray-300 my-2" />
              {user ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="relative group z-50">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/G2jQXGk/default-avatar.png"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                      />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-max">
                        {user.displayName}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/signin" className="btn">
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="btn px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
