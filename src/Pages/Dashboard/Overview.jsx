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
    const [recentActivities, setRecentActivities] = useState([]);
    // const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
    // const [visitorCount, setVisitorCount] = useState(0);

// useEffect(() => {
//   // Register this visit (unique by IP)
//   fetch('https://assignment-10-server-ten-eosin.vercel.app/api/visit', { method: 'POST' });

//   // Fetch unique visitor count
//   fetch('https://assignment-10-server-ten-eosin.vercel.app/api/visit-count')
//     .then(res => res.json())
//     .then(data => setVisitorCount(data.count));
// }, []);

    

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // console.log('User object:', user);
                const headers = {
                    'authorization': `Bearer ${localStorage.getItem('access-token')}`
                };

                // Fetch total tasks
                // console.log('Fetching all tasks...');
                const tasksResponse = await fetch('https://assignment-10-server-ten-eosin.vercel.app/tasks', {
                    headers
                });
                // console.log('Tasks response status:', tasksResponse.status);
                const tasksData = await tasksResponse.json();
                // console.log('Tasks data:', tasksData);

                // Fetch user's posted tasks
                // console.log('Fetching posted tasks for:', user?.email);
                const postedTasksResponse = await fetch(`https://assignment-10-server-ten-eosin.vercel.app/my-tasks?email=${user?.email}`, {
                    headers
                });
                // console.log('Posted tasks response status:', postedTasksResponse.status);
                const postedTasksData = await postedTasksResponse.json();
                // console.log('Posted tasks data:', postedTasksData);

                // Fetch user's bids count
                // console.log('Fetching bids for:', user?.email);
                const bidsResponse = await fetch(`https://assignment-10-server-ten-eosin.vercel.app/bids/${user?.email}`, {
                    headers
                });
                // console.log('Bids response status:', bidsResponse.status);
                const bidsData = await bidsResponse.json();
                // console.log('Bids data:', bidsData);

                const activities = [];

                // Add posted tasks
                postedTasksData.forEach(task => {
                    activities.push({
                        type: 'Posted Task',
                        title: task.title,
                        date: task.createdAt || task.postedAt || task.postedDate,
                        id: task._id
                    });
                });

                // Add bids
                if (Array.isArray(bidsData.bids)) {
                    bidsData.bids.forEach(bid => {
                        activities.push({
                            type: 'Placed Bid',
                            title: bid.taskTitle, // adjust field name as needed
                            date: bid.bidTime || bid.createdAt, // adjust field name as needed
                            id: bid._id
                        });
                    });
                }

                // Sort by date, descending
                activities.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Keep only the most recent 5
                setRecentActivities(activities.slice(0, 5));

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
                <span className="custom_loader"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-base-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.displayName}!</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Tasks */}
                <div className="bg-base-200 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-base-content/70">All Tasks</p>
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

            {/* Recent Activity Feed */}
            <div className="bg-base-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                {recentActivities.length === 0 ? (
                    <p className="text-base-content/70">No recent activity.</p>
                ) : (
                    <ul className="space-y-2">
                        {recentActivities.map((activity, idx) => (
                            <li key={activity.id || idx} className="flex justify-between items-center">
                                <span>
                                    <span className="font-semibold">{activity.type}:</span> {activity.title}
                                </span>
                                <span className="text-sm text-base-content/60">
                                    {activity.date && !isNaN(new Date(activity.date))
                                        ? new Date(activity.date).toLocaleString()
                                        : "No Date"}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* visitor counter */}
            {/* <div className="bg-base-200 rounded-lg p-6">
  <h3 className="text-lg font-bold mb-2">Unique Visitors</h3>
  <p className="text-2xl font-bold">{visitorCount}</p>
</div> */}
        </div>
    );
};

export default Overview;