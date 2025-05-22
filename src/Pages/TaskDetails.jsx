import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-hot-toast';

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bidsCount, setBidsCount] = useState(0);
    const [totalBids, setTotalBids] = useState(0);

    // Function to fetch user's bid count
    const fetchUserBidsCount = async () => {
        if (user?.email) {
            try {
                const response = await fetch(`http://localhost:3000/bids/${user.email}`);
                const data = await response.json();
                setBidsCount(data.bidCount);
            } catch (error) {
                console.error('Error fetching user bids count:', error);
            }
        }
    };

    // Function to fetch task details
    const fetchTaskDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`);
            const data = await response.json();
            setTask(data);
            setTotalBids(data.totalBids || 0);
        } catch (error) {
            console.error('Error fetching task details:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                fetchTaskDetails(),
                fetchUserBidsCount()
            ]);
            setLoading(false);
        };

        fetchData();
    }, [id, user?.email]);

    const handleBid = async () => {
        try {
            if (!user) {
                toast.error('Please login to place a bid');
                return;
            }

            if (user.email === task.userEmail) {
                toast.error('You cannot bid on your own task');
                return;
            }

            const currentDate = new Date();
            const taskDeadline = new Date(task.deadline);
            if (currentDate > taskDeadline) {
                toast.error('This task has passed its deadline');
                return;
            }

            // Check if user has already bid on this task
            const checkResponse = await fetch(`http://localhost:3000/check-user-bid/${id}/${user.email}`);
            const checkData = await checkResponse.json();

            if (checkData.hasBid) {
                toast.error('You have already placed a bid on this task');
                return;
            }

            // Check if user has reached maximum bids for the day
            if (bidsCount >= 5) {
                toast.error('You have reached the maximum number of bids for today');
                return;
            }

            const bidData = {
                taskId: id,
                taskTitle: task.title,
                userEmail: user.email,
                userName: user.displayName,
                taskOwnerEmail: task.userEmail,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            // Create the bid
            const response = await fetch('http://localhost:3000/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bidData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place bid');
            }

            const data = await response.json();

            if (data.success) {
                // Refresh both counts from server to ensure accuracy
                await Promise.all([
                    fetchTaskDetails(),
                    fetchUserBidsCount()
                ]);

                toast.success('Your bid has been placed successfully!');
                toast.success(`You have ${5 - (bidsCount + 1)} bids remaining today`);
            } else {
                throw new Error(data.message || 'Failed to place bid');
            }
        } catch (error) {
            console.error('Bid error:', error);
            toast.error(error.message || 'Something went wrong while placing your bid');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    <div></div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-medium text-right">
                            You bid for {bidsCount} opportunities
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                                        {task.category}
                                    </span>
                                    <span className="text-gray-500 text-sm">Posted by: {task.userName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Description</h2>
                            <p className="text-gray-600 leading-relaxed">{task.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Budget</p>
                                        <p className="font-semibold text-gray-900">${task.budget}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Deadline</p>
                                        <p className="font-semibold text-gray-900">
                                            {new Date(task.deadline).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className="font-semibold text-gray-900">Open for Bids</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user && user.email !== task.userEmail && (
                            <button
                                onClick={handleBid}
                                className="btn w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Place Bid
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;