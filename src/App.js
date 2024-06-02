import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));

// const ProtectedRoute = ({ element, isAllowed, ...rest }) => {
//   return isAllowed ? element : <LoginForm />;
// };

const ProtectedAdminRoute = ({ element }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? element : <LoginForm />;
};

const ProtectedUserRoute = ({ element }) => {
  const { user } = useAuth();
  return user && user.role === "user" ? element : <LoginForm />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
              path="/admin"
              element={<ProtectedAdminRoute element={<AdminDashboard />} />}
            />
            <Route
              path="/user"
              element={<ProtectedUserRoute element={<UserDashboard />} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
