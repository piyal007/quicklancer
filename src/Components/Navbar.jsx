import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { useTheme } from "../Providers/ThemeProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
      });

      if (result.isConfirmed) {
        await signOut(auth);
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error signing out: " + error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <div className={`bg-gradient-to-r from-base-100 to-base-200 text-base-content z-[1000] ${scrolled ? 'shadow-lg py-0 backdrop-blur-sm bg-opacity-95' : 'shadow-md py-1'} fixed top-0 w-full transition-all duration-300`}>
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center">
            <div className="nav-left">
              <h2 className="cursor-pointer text-2xl md:text-3xl font-bold font-rancho text-base-content transition-all duration-300 transform hover:scale-105 hover:text-shadow">
                <span className="text-success">Quick</span>Lancer
              </h2>
            </div>

            {/* Hamburger Menu Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="lg:hidden"></div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-base-content focus:outline-none"
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
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex-1 md:flex justify-center">
              <div className="nav-middle space-x-6 *:font-semibold *:text-base-content *:hover:text-success *:transition-colors *:py-2 *:px-1 *:relative *:after:content-[''] *:after:absolute *:after:w-0 *:after:h-0.5 *:after:bg-success *:after:left-0 *:after:-bottom-1 *:after:transition-all *:after:duration-300 *:hover:after:w-full">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-medium nav-link"
                      : "font-medium text-base-content hover:text-success nav-link"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="add_task"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-medium nav-link"
                      : "font-medium text-base-content hover:text-success nav-link"
                  }
                >
                  Add Task
                </NavLink>
                <NavLink
                  to="/all_tasks"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-medium nav-link"
                      : "font-medium text-base-content hover:text-success nav-link"
                  }
                >
                  All Tasks
                </NavLink>
                <NavLink
                  to="/my_tasks"
                  className={({ isActive }) =>
                    isActive
                      ? "active font-medium nav-link"
                      : "font-medium text-base-content hover:text-success nav-link"
                  }
                >
                  My Tasks
                </NavLink>
              </div>
            </div>
            <div className="hidden md:flex items-center *:font-semibold">
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-sm bg-base-200 hover:bg-base-300 border-none mr-4 transition-all duration-300 hover:shadow-md hover:scale-105"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <div className="nav-right flex items-center space-x-4 *:font-semibold">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="relative group z-50">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.postimg.cc/yxzXkbkL/avatar.jpg"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover bg-base-content text-base-100 border-2 border-success shadow-md"
                      />
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-base-content text-base-100 text-sm py-2 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 min-w-max shadow-lg border border-success/20 backdrop-blur-sm flex flex-col gap-2">
                        <span>{user.displayName}</span>
                        <NavLink to="/dashboard" className="hover:text-success transition-colors">
                          Dashboard
                        </NavLink>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm bg-gradient-to-r from-success to-success/80 text-white border-none hover:opacity-90 transition-all duration-300 shadow-md"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <>
                    <NavLink
                      to="/signin"
                      className="btn btn-sm bg-base-300 text-base-content border-none hover:bg-base-200 transition-all duration-300 shadow-sm"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="btn btn-sm bg-gradient-to-r from-success to-success/80 text-white border-none hover:opacity-90 transition-all duration-300 shadow-md"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isOpen ? "block mobile-menu-open" : "hidden"} pt-4 pb-2 border-t border-base-300 mt-3 relative z-50`}>
            <div className="flex flex-col space-y-4 *:font-semibold *:text-base-content *:hover:text-success *:transition-colors">
              <button
                onClick={toggleTheme}
                className="btn btn-sm bg-base-200 hover:bg-base-300 border-none text-left flex items-center gap-2 w-fit px-4 hover:shadow-md transition-all duration-300"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 border-l-2 border-success pl-2 active font-medium nav-link"
                    : "block py-1 border-l-2 border-transparent hover:border-success pl-2 font-medium text-base-content hover:text-success nav-link"
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/dashboard/add-task" 
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 border-l-2 border-success pl-2 active font-medium nav-link"
                    : "block py-1 border-l-2 border-transparent hover:border-success pl-2 font-medium text-base-content hover:text-success nav-link"
                }
              >
                Add Task
              </NavLink>
              <NavLink 
                to="/browsetask" 
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 border-l-2 border-success pl-2 active font-medium nav-link"
                    : "block py-1 border-l-2 border-transparent hover:border-success pl-2 font-medium text-base-content hover:text-success nav-link"
                }
              >
                Browse Tasks
              </NavLink>
              <NavLink 
                to="/dashboard/my-posted-tasks" 
                className={({ isActive }) =>
                  isActive
                    ? "block py-1 border-l-2 border-success pl-2 active font-medium nav-link"
                    : "block py-1 border-l-2 border-transparent hover:border-success pl-2 font-medium text-base-content hover:text-success nav-link"
                }
              >
                My Tasks
              </NavLink>
              <hr className="border-base-300 my-3" />
              {user ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="relative group z-50">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.postimg.cc/yxzXkbkL/avatar.jpg"
                        }
                        alt="user"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-success shadow-md"
                      />
                      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap bg-base-content text-base-100 text-sm py-2 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 min-w-max shadow-lg border border-success/20 backdrop-blur-sm flex flex-col gap-2">
                        <span>{user.displayName}</span>
                        <NavLink to="/dashboard" className="hover:text-success transition-colors">
                          Dashboard
                        </NavLink>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm bg-gradient-to-r from-success to-success/80 text-white border-none hover:opacity-90 transition-all duration-300 shadow-md"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="btn btn-sm bg-base-300 text-base-content border-none hover:bg-base-200 transition-all duration-300 shadow-sm w-full"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="btn btn-sm bg-gradient-to-r from-success to-success/80 text-white border-none hover:opacity-90 transition-all duration-300 shadow-md w-full"
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
