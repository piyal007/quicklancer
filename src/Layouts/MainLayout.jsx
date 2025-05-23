import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../Providers/ThemeProvider';

const MainLayout = () => {
  const { theme } = useTheme();

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