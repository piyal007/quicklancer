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
        <div className="py-20 bg-base-100 text-base-content">
            <div className="w-11/12 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Featured Tasks</h2>
                    <p className="text-xs md:text-lg max-w-2xl mx-auto">Explore our featured opportunities and find the perfect project for your skills</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tasks.map(task => (
                        <div key={task._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-4">{task.title}</h3>
                                    <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                                        {task.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed">{task.description}</p>
                                <div className="flex flex-col space-y-4 mb-6">
                                    <div className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span className="font-medium">${task.budget}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="font-medium">{new Date(task.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/task-details/${task._id}`}
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
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