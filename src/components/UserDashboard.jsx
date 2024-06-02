import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import TaskManager from "./TaskManager";

const UserDashboard = React.memo(() => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);

  const addTask = useCallback((task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  const deleteTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }, []);

  const updateTask = useCallback((index, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? updatedTask : task))
    );
  }, []);

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="flex justify-between mb-20">
        <div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            User Dashboard
          </h1>
          <p className="text-gray-900 dark:text-white">
            Welcome, {user.username}
          </p>
        </div>
        <div>
          <button
            onClick={logout}
            className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-gray-500 dark:text-gray-400">
              Total tasks: {totalTasks}
            </p>
            <TaskManager
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default UserDashboard;
