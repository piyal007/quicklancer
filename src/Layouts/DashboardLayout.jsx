import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';
import { useTheme } from '../Providers/ThemeProvider';
import { FaHome, FaClipboardList, FaPlus, FaTasks, FaChartBar } from 'react-icons/fa';

const DashboardLayout = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-base-100" data-theme={theme}>
            <div className="drawer lg:drawer-open">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                
                {/* Dashboard Content */}
                <div className="drawer-content flex flex-col">
                    {/* Dashboard Navbar */}
                    <div className="w-full navbar bg-base-300 lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Dashboard</h2>
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="p-4 lg:p-6">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                        {/* User Info */}
                        <div className="flex flex-col items-center gap-2 mb-6 pt-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} alt={user?.displayName} />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">{user?.displayName}</h3>
                        </div>

                        {/* Menu Items */}
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 ${location.pathname === '/dashboard' ? 'active' : ''}`}
                                >
                                    <FaChartBar /> Overview
                                </Link>
                            </li>
                            <div className="divider"></div>
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2"
                                >
                                    <FaHome /> Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;