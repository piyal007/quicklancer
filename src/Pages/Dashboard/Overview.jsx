import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Providers/AuthProvider';
import { FaClipboardList, FaTasks, FaCheckCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Overview = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalTasks: 0,
        myPostedTasks: 0,
        myBids: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log('User object:', user);
                const headers = {
                    'authorization': `Bearer ${localStorage.getItem('access-token')}`
                };

                // Fetch total tasks
                console.log('Fetching all tasks...');
                const tasksResponse = await fetch('https://assignment-10-server-ten-eosin.vercel.app/tasks', {
                    headers
                });
                console.log('Tasks response status:', tasksResponse.status);
                const tasksData = await tasksResponse.json();
                console.log('Tasks data:', tasksData);

                // Fetch user's posted tasks
                console.log('Fetching posted tasks for:', user?.email);
                const postedTasksResponse = await fetch(`https://assignment-10-server-ten-eosin.vercel.app/my-tasks?email=${user?.email}`, {
                    headers
                });
                console.log('Posted tasks response status:', postedTasksResponse.status);
                const postedTasksData = await postedTasksResponse.json();
                console.log('Posted tasks data:', postedTasksData);

                // Fetch user's bids count
                console.log('Fetching bids for:', user?.email);
                const bidsResponse = await fetch(`https://assignment-10-server-ten-eosin.vercel.app/bids/${user?.email}`, {
                    headers
                });
                console.log('Bids response status:', bidsResponse.status);
                const bidsData = await bidsResponse.json();
                console.log('Bids data:', bidsData);

                setStats({
                    totalTasks: tasksData.length,
                    myPostedTasks: postedTasksData.length,
                    myBids: bidsData.bidCount
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({
                    totalTasks: 0,
                    myPostedTasks: 0,
                    myBids: 0
                });
                setLoading(false);
            }
        };

        // Initial fetch
        if (user?.email) {
            fetchStats();
        }

        // No interval, only fetch once
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-base-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.displayName}! 👋</h2>
                <p className="text-base-content/70">Here's what's happening with your tasks and bids today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Tasks */}
                <div className="bg-base-200 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">Total Tasks</p>
                            <h3 className="text-2xl font-bold mt-1">{stats.totalTasks}</h3>
                        </div>
                        <div className="bg-primary/20 p-3 rounded-full">
                            <FaClipboardList className="text-primary text-xl" />
                        </div>
                    </div>
                </div>

                {/* My Posted Tasks */}
                <div className="bg-base-200 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">My Posted Tasks</p>
                            <h3 className="text-2xl font-bold mt-1">{stats.myPostedTasks}</h3>
                        </div>
                        <div className="bg-secondary/20 p-3 rounded-full">
                            <FaTasks className="text-secondary text-xl" />
                        </div>
                    </div>
                </div>

                {/* My Bids */}
                <div className="bg-base-200 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">My Bids</p>
                            <h3 className="text-2xl font-bold mt-1">{stats.myBids}</h3>
                        </div>
                        <div className="bg-accent/20 p-3 rounded-full">
                            <FaCheckCircle className="text-accent text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-base-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} alt={user?.displayName} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{user?.displayName}</h3>
                        <p className="text-base-content/70">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;