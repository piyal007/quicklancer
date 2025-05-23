import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../Providers/ThemeProvider';

const MainLayout = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen" data-theme={theme}>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div data-theme={theme}>
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
      <div data-theme={theme}>
        <Footer></Footer>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MainLayout;