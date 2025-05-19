import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <>
      <div className="bg-gray-200">
        <div className="w-11/12 mx-auto py-4 flex justify-between items-center">
          <div className="nav-left">
            <h2 className="text-3xl font-bold font-rancho">QuickLancer</h2>
          </div>
          <div className="nav-middle space-x-4 *:font-semibold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/addtask">Add-Task</NavLink>
            <NavLink to="/addtask">Browse-Tasks</NavLink>
            <NavLink to="/addtask">My-Posted-Tasks</NavLink>
          </div>
          <div className="nav-right space-x-4 *:font-semibold">
            <NavLink>Sign In</NavLink>
            <NavLink>Sign Up</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
