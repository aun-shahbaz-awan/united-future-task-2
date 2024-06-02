import React, { useState } from "react";

const TaskManager = ({ tasks, addTask, deleteTask, updateTask }) => {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  const handleEditTask = (index, task) => {
    setEditIndex(index);
    setEditTask(task);
  };

  const handleSaveTask = () => {
    if (editTask.trim()) {
      updateTask(editIndex, editTask.trim());
      setEditIndex(null);
      setEditTask("");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80"
        >
          Add&nbsp;Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg dark:bg-gray-700"
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            ) : (
              <span>{task}</span>
            )}
            <div className="space-x-2 flex ml-2">
              {editIndex === index ? (
                <button
                  onClick={handleSaveTask}
                  className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditTask(index, task)}
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(index)}
                className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
