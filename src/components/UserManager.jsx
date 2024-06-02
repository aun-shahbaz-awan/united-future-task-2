// src/components/UserManager.js
import React, { useState } from "react";

const UserManager = ({ users, addUser, deleteUser, updateUser }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleAddUser = () => {
    if (newUsername.trim() && newEmail.trim()) {
      addUser(newUsername.trim(), newEmail.trim());
      setNewUsername("");
      setNewEmail("");
    }
  };

  const handleEditUser = (index, user) => {
    setEditIndex(index);
    setEditUsername(user.username);
    setEditEmail(user.email);
  };

  const handleSaveUser = () => {
    if (editUsername.trim() && editEmail.trim()) {
      updateUser(editIndex, {
        username: editUsername.trim(),
        email: editEmail.trim(),
      });
      setEditIndex(null);
      setEditUsername("");
      setEditEmail("");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter username"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={handleAddUser}
          className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80"
        >
          Add&nbsp;User
        </button>
      </div>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg dark:bg-gray-700"
          >
            {editIndex === index ? (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            ) : (
              <span>
                {user.username} - {user.email}
              </span>
            )}
            <div className="space-x-2 flex ml-2">
              {editIndex === index ? (
                <button
                  onClick={handleSaveUser}
                  className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditUser(index, user)}
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteUser(index)}
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

export default UserManager;
