import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

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
        const response = await fetch(
          `https://assignment-10-server-ten-eosin.vercel.app/bids/${user.email}`
        );
        const data = await response.json();
        setBidsCount(data.bidCount);
      } catch (error) {
        console.error("Error fetching user bids count:", error);
      }
    }
  };

  // Function to fetch task details
  const fetchTaskDetails = async () => {
    try {
      const response = await fetch(
        `https://assignment-10-server-ten-eosin.vercel.app/tasks/${id}`
      );
      const data = await response.json();
      setTask(data);
      setTotalBids(data.totalBids || 0);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTaskDetails(), fetchUserBidsCount()]);
      setLoading(false);
    };

    fetchData();
  }, [id, user?.email]);

  const handleBid = async () => {
    try {
      if (!user) {
        toast.error("Please login to place a bid", {
          style: {
            background: "#FF5B5B",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "🔒",
          duration: 3000,
        });
        return;
      }

      if (user.email === task.userEmail) {
        toast.error("You cannot bid on your own task", {
          style: {
            background: "#FF5B5B",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "⚠️",
          duration: 3000,
        });
        return;
      }

      const currentDate = new Date();
      const taskDeadline = new Date(task.deadline);
      if (currentDate > taskDeadline) {
        toast.error("This task has passed its deadline", {
          style: {
            background: "#FF5B5B",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "⏰",
          duration: 3000,
        });
        return;
      }

      // Check if user has already bid on this task
      const checkResponse = await fetch(
        `https://assignment-10-server-ten-eosin.vercel.app/check-user-bid/${id}/${user.email}`
      );
      const checkData = await checkResponse.json();

      if (checkData.hasBid) {
        toast.error("You have already placed a bid on this task", {
          style: {
            background: "#FF5B5B",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "📝",
          duration: 3000,
        });
        return;
      }

      const bidData = {
        taskId: id,
        taskTitle: task.title,
        userEmail: user.email,
        userName: user.displayName,
        taskOwnerEmail: task.userEmail,
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      // Create the bid
      const response = await fetch(
        "https://assignment-10-server-ten-eosin.vercel.app/bids",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bidData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place bid");
      }

      const data = await response.json();

      if (data.success) {
        // Refresh both counts from server to ensure accuracy
        await Promise.all([fetchTaskDetails(), fetchUserBidsCount()]);

        toast.success("Your bid has been placed successfully!", {
          style: {
            background: "#10B981",
            color: "#fff",
            padding: "16px",
            borderRadius: "10px",
          },
          icon: "🎉",
          duration: 3000,
        });
      } else {
        throw new Error(data.message || "Failed to place bid");
      }
    } catch (error) {
      console.error("Bid error:", error);
      toast.error(
        error.message || "Something went wrong while placing your bid"
      );
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-end">
          <div className="p-4 bg-success/10 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all">
            <p className="text-success font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              You've bid on {bidsCount} opportunities
            </p>
          </div>
        </div>

        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl border border-base-300">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-2 leading-tight">
                  {task.title}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {task.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Posted by: {task.userName}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-base-200/50 backdrop-blur-sm rounded-2xl p-8 mb-10">
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                Task Description
              </h2>
              <p className="text-base-content/80 leading-relaxed text-lg">
                {task.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="stats shadow bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-figure text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="stat-title text-base-content/60">Budget</div>
                  <div className="stat-value text-success">${task.budget}</div>
                </div>
              </div>

              <div className="stats shadow bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="stat-title text-base-content/60">
                    Deadline
                  </div>
                  <div className="stat-value text-primary text-2xl">
                    {new Date(task.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="stats shadow bg-base-100 border border-base-300">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <div className="badge badge-secondary badge-lg">
                      {totalBids}
                    </div>
                  </div>
                  <div className="stat-title text-base-content/60">
                    Total Bids
                  </div>
                  <div className="stat-value text-secondary">Open</div>
                </div>
              </div>
            </div>

            {user && user.email !== task.userEmail && (
              <button
                onClick={handleBid}
                className="btn btn-primary w-full text-lg font-bold gap-2 min-h-[3.5rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Place Your Bid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
