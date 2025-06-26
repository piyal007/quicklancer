import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    fetch(
      "https://assignment-10-server-ten-eosin.vercel.app/featured-tasks?limit=6"
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
    <div className="py-8 bg-gradient-to-b from-base-100 to-blue-50 text-base-content">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-base-content">
            Featured Tasks
          </h2>
          <p className="text-sm md:text-lg max-w-2xl mx-auto text-base-content">
            Explore our featured opportunities and find the perfect project for
            your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100/20 backdrop-blur-sm"
            >
              <div className="p-8 relative z-10 backdrop-blur-sm bg-white/80">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-4">
                    {task.title}
                  </h3>
                  <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    {task.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-8 line-clamp-3 text-base leading-relaxed transition-all duration-300">
                  {task.description}
                </p>
                <div class="flex justify-between items-center mb-6 border border-gray-100 rounded-lg p-4">
                  <div class="flex items-center text-gray-700">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div class="flex flex-col">
                      <span class="text-xs text-gray-500">Budget</span>
                      <span class="font-medium">${task.budget}</span>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-2">
                    <div class="flex items-center justify-end text-gray-700 space-x-6">
                      <div class="flex items-center">
                        <svg
                          class="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <div class="flex flex-col items-end">
                          <span class="text-xs text-gray-500">Posted on</span>
                          <span class="font-medium">
                            {new Date(task.postedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end text-gray-700">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <div class="flex flex-col items-end">
                        <span class="text-xs text-gray-500">Deadline</span>
                        <span class="font-medium">
                          {new Date(task.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/task-details/${task._id}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg transform active:scale-95"
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
