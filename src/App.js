import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));

const ProtectedRoute = ({ element, isAllowed, ...rest }) => {
  return isAllowed ? element : <LoginForm />;
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
              element={
                <ProtectedRoute isAllowed={true} element={<AdminDashboard />} />
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute isAllowed={true} element={<UserDashboard />} />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
