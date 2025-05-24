import React, { useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddTask = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    description: "",
    deadline: "",
    displayDeadline: "",
    budget: "",
  });

  const categories = [
    "Web Development",
    "Design",
    "Writing",
    "Marketing",
    "Mobile Development",
    "Data Entry",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deadline" && value) {
      // Convert yyyy-mm-dd to display format dd/mm/yyyy
      const date = new Date(value);
      const displayDate = date.toLocaleDateString("en-GB"); // Uses dd/mm/yyyy format
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        displayDeadline: displayDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      status: "pending",
      postedDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://assignment-10-server-ten-eosin.vercel.app/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      Swal.fire({
        icon: "success",
        title: "Task Added Successfully!",
        text: "Your task has been posted.",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setFormData({
        title: "",
        category: "Web Development",
        description: "",
        deadline: "",
        budget: "",
      });
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-11/12 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add New Task
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Deadline
              </label>
              <div
                className="relative"
                onClick={() => document.getElementById("deadline").showPicker()}
              >
                <input
                  type="text"
                  readOnly
                  value={formData.displayDeadline || ""}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  placeholder="dd/mm/yyyy"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  User Email:
                </span>
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  User Name:
                </span>
                <span className="text-sm text-gray-600">
                  {user?.displayName}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
