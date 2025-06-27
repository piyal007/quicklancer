import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../Providers/ThemeProvider';

const MainLayout = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen" data-theme={theme}>
        <span className="custom_loader"></span>
      </div>
    );
  }

  return (
    <div>
      <div data-theme={theme} ref={navRef}>
        <Navbar></Navbar>
      </div>
      <div className="transition-all duration-300 -mt-[1px]">
        <Outlet></Outlet>
      </div>
      <div data-theme={theme}>
        <Footer></Footer>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MainLayout;