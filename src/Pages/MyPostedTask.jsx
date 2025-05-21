import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyPostedTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-tasks?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              )
              const remaining = tasks.filter(task => task._id !== id);
              setTasks(remaining);
            }
          })
      }
    })
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  return (
    <div className='bg-gray-50 min-h-screen py-12'>
      <div className='w-11/12 max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>My Posted Tasks</h1>
          <p className='text-gray-600 mt-2'>Manage and track your posted tasks</p>
        </div>

        <div className='bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-200'>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Task Title</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Deadline</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Budget</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
                  <th className='px-6 py-4 text-right text-sm font-semibold text-gray-900'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {tasks.map(task => (
                  <tr key={task._id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='text-sm font-medium text-gray-900'>{task.title}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm text-gray-600'>
                        {new Date(task.deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm font-medium text-gray-900'>${task.budget}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={
                        `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`
                      }>
                        {task.status || 'Open'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right space-x-2'>
                      <Link
                        to={`/update-task/${task._id}`}
                        className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className='cursor-pointer inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      >
                        Delete
                      </button>
                      <Link
                        to={`/task-details/${task._id}`}
                        className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      >
                        Bids
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostedTask;