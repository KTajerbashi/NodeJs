import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Main/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthLayout from "../layouts/Auth/AuthLayout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Users from "../pages/Users/Users";
import Roles from "../pages/Roles/Roles";
import Settings from "../pages/Settings/Settings";
import Profile from "../pages/Profile/Profile";

// import MainLayout from "../../layouts/Main/Main.Layout";

// import Dashboard from "../../pages/Dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Main Application Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />

        <Route path="/roles" element={<Roles />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
