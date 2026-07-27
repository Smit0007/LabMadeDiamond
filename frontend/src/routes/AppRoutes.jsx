import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Catalog from "../pages/Catalog";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PendingApproval from "../pages/PendingApproval";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import InventoryListing from "../pages/InventoryListing";

import AdminDashboard from "../pages/admin/AdminDashboard";
import PendingUsers from "../pages/admin/PendingUsers";
import ApprovedUsers from "../pages/admin/ApprovedUsers";
import UploadInventory from "../pages/admin/UploadInventory";
import InventoryFiles from "../pages/admin/InventoryFiles";

import QuoteCart from "../pages/QuoteCart";
import QuoteRequests from "../pages/admin/QuoteRequests";
import QuoteDetails from "../pages/admin/QuoteDetails";

import AdminProtectedRoute
  from "../components/admin/AdminProtectedRoute";

import AdminLogin from "../pages/admin/AdminLogin";

import MyRequests from "../pages/MyRequests";

export default function AppRoutes() {

  return (

    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/pending-approval"
          element={<PendingApproval />}
        />

        <Route
          path="/catalog"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/catalog/:category"
          element={
            <ProtectedRoute>
              <InventoryListing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quote-cart"
          element={
            <ProtectedRoute>
              <QuoteCart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/pending-users"
          element={
            <AdminProtectedRoute>
              <PendingUsers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/approved-users"
          element={
            <AdminProtectedRoute>
              <ApprovedUsers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/upload"
          element={
            <AdminProtectedRoute>
              <UploadInventory />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/files"
          element={
            <AdminProtectedRoute>
              <InventoryFiles />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/quotes"
          element={
            <AdminProtectedRoute>
              <QuoteRequests />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/quotes/:id"
          element={
            <AdminProtectedRoute>
              <QuoteDetails />
            </AdminProtectedRoute>
          }
        />

      </Route>

    </Routes>

  );

}