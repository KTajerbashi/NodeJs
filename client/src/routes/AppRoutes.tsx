import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/Main/MainLayout";
import AuthLayout from "../layouts/Auth/AuthLayout";

// import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Users from "../pages/Users/Users";
import Roles from "../pages/Roles/Roles";
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Application Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
