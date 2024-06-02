import React, { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import UserManager from "./UserManager";

const AdminDashboard = React.memo(() => {
  const { user, logout, users, addUser } = useAuth();
  const [userList, setUserList] = useState(users);

  const handleAddUser = useCallback(
    (username, email, password) => {
      addUser(username, email, password);
      setUserList([...userList, { username, email, password, role: "user" }]);
    },
    [addUser, userList]
  );

  const handleDeleteUser = useCallback(
    (index) => {
      setUserList(userList.filter((_, i) => i !== index));
    },
    [userList]
  );

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="flex justify-between mb-20">
        <div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Admin Dashboard
          </h1>
        </div>
        <div>
          <button
            onClick={logout}
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary/70 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary/80"
          >
            Logout
          </button>
        </div>
      </div>
      <UserManager
        users={userList}
        addUser={handleAddUser}
        deleteUser={handleDeleteUser}
      />
    </section>
  );
});

export default AdminDashboard;
