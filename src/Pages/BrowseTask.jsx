import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrowseTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchTasks = () => {
    fetch("https://assignment-10-server-ten-eosin.vercel.app/tasks")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || task.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const categories = ["all", ...new Set(tasks.map((task) => task.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="custom_loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 pt-24 md:pt-28">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Tasks
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect task that matches your skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
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
              <div className="p-4 relative z-10 backdrop-blur-sm bg-white/80">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-md font-bold text-gray-900 group-hover:text-blue-600 transition-colors min-h-[3rem]">
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

export default BrowseTask;
