import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeaturedTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/featured-tasks?limit=6')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                return res.json();
            })
            .then(data => {
                // Sort tasks by deadline (most recent first)
                const sortedTasks = data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                setTasks(sortedTasks);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="py-16 bg-gray-50">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tasks</h2>
                    <p className="text-gray-600">Explore our most recent opportunities</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <div key={task._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                        {task.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>Budget: ${task.budget}</span>
                                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                                </div>
                                <Link
                                    to={`/task/${task._id}`}
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedTasks;