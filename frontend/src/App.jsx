import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import NotFound from "./error/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to={"/login"} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
