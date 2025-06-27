import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch(
      "https://assignment-10-server-ten-eosin.vercel.app/featured-tasks?limit=8"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return res.json();
      })
      .then((data) => {
        // Sort tasks by deadline (most recent first)
        const sortedTasks = data.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
        setTasks(sortedTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks(); // Initial fetch
    const interval = setInterval(fetchTasks, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-8 bg-base-200 text-base-content">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold pb-2 text-base-content">
            Featured Tasks
          </h2>
          <hr className="w-2/12 mx-auto border-2 border-blue-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100/20 backdrop-blur-sm"
            >
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-40 object-cover object-center rounded-t-xl"
              />
              <div className="p-8 relative z-10 backdrop-blur-sm bg-white/80">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                    {task.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 text-base leading-relaxed transition-all duration-300">
                  {task.description}
                </p>
                <div className=" mb-6 flex flex-col gap-2">
{/* budged */}
<div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
    <div className="stat-title">Budget:</div>
    <div className="stat-value text-success">${task.budget}</div>
  </div>

</div>


                  
                  
                </div>

                <Link
                  to={`/task-details/${task._id}`}
                  className="btn btn-outline btn-success w-full text-center hover:text-white text-success font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95"
                >
                  See Details
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
