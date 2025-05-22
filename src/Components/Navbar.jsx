import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of your account',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      });

      if (result.isConfirmed) {
        await signOut(auth);
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error signing out: ' + error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 shadow-md z-50">
        <div className="w-11/12 mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="nav-left">
              <h2 className="cursor-pointer text-2xl md:text-3xl font-bold font-rancho text-gray-900 dark:text-white">
                QuickLancer
              </h2>
            </div>

            {/* Hamburger Menu Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
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
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex-1 md:flex justify-center">
              <div className="nav-middle space-x-4 *:font-semibold *:text-gray-700 dark:*:text-gray-200 *:hover:text-gray-900 dark:*:hover:text-white *:transition-colors">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/addtask">Add-Task</NavLink>
                <NavLink to="/browsetask">Browse-Tasks</NavLink>
                <NavLink to="/mypostedtask">My-Posted-Tasks</NavLink>
              </div>
            </div>
            <div className="hidden md:flex items-center *:font-semibold">
              <div className="nav-right flex items-center space-x-4 *:font-semibold">
                <ThemeToggle />
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="relative group z-50">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.postimg.cc/yxzXkbkL/avatar.jpg"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                      />
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 dark:bg-gray-700 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-max">
                        {user.displayName}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn dark:text-white dark:hover:text-white transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <>
                    <NavLink
                      to="/signin"
                      className="btn dark:text-white dark:hover:text-white transition-colors"
                    >
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

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pt-4`}>
            <div className="flex flex-col space-y-3 *:font-semibold *:text-gray-700 dark:*:text-gray-200 *:hover:text-gray-900 dark:*:hover:text-white *:transition-colors">
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
              <hr className="border-gray-300 dark:border-gray-600 my-2" />

              <hr className="border-gray-300 dark:border-gray-600 my-2" />
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
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 dark:bg-gray-700 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-max">
                        {user.displayName}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="btn dark:bg-black dark:text-white"
                  >
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
