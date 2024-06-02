import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const initialUsers = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin",
    role: "admin",
  },
  {
    username: "user1",
    email: "user1@example.com",
    password: "user1",
    role: "user",
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "user2",
    role: "user",
  },
  {
    username: "user3",
    email: "user3@example.com",
    password: "user3",
    role: "user",
  },
  {
    username: "user4",
    email: "user4@example.com",
    password: "user4",
    role: "user",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);

  const login = (email, password) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const logout = () => setUser(null);

  const addUser = (username, email, password, role = "user") => {
    setUsers([...users, { username, email, password, role }]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addUser, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
