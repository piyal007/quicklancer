import React, { useEffect, useState } from 'react';
import { useAuth } from '../Providers/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        deadline: '',
        budget: ''
    });

    const categories = [
        'Web Development',
        'Design',
        'Writing',
        'Marketing',
        'Mobile Development',
        'Data Entry'
    ];

    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                const initialData = {
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    deadline: data.deadline.split('T')[0],
                    budget: data.budget
                };
                setInitialFormData(initialData);
                setFormData({
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    deadline: data.deadline.split('T')[0],
                    budget: data.budget
                });
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [initialFormData, setInitialFormData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any changes were made
        const hasChanges = Object.keys(formData).some(key => formData[key] !== initialFormData[key]);

        if (!hasChanges) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes Detected',
                text: 'Please make some changes before updating.',
                showConfirmButton: true,
                timer: 3000
            });
            return;
        }

        const taskData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            updatedAt: new Date().toISOString()
        };

        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            Swal.fire({
                icon: 'success',
                title: 'Task Updated Successfully!',
                text: 'Your task has been updated.',
                showConfirmButton: false,
                timer: 2000
            });

            navigate('/mypostedtask');

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update task. Please try again.'
            });
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div className='min-h-screen bg-gray-50 py-12'>
            <div className='w-11/12 max-w-2xl mx-auto'>
                <div className='bg-white rounded-lg shadow-md p-8'>
                    <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>Update Task</h2>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>
                                Task Title
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2'>
                                Category
                            </label>
                            <select
                                id='category'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                rows='4'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor='deadline' className='block text-sm font-medium text-gray-700 mb-2'>
                                Deadline
                            </label>
                            <input
                                type='date'
                                id='deadline'
                                name='deadline'
                                value={formData.deadline}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='budget' className='block text-sm font-medium text-gray-700 mb-2'>
                                Budget ($)
                            </label>
                            <input
                                type='number'
                                id='budget'
                                name='budget'
                                value={formData.budget}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                                <span className='text-sm font-medium text-gray-700'>User Email:</span>
                                <span className='text-sm text-gray-600'>{user?.email}</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <span className='text-sm font-medium text-gray-700'>User Name:</span>
                                <span className='text-sm text-gray-600'>{user?.displayName}</span>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >
                            Update Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;