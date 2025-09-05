// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/Contactus";
import Service from "./pages/Service";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobFormPage from "./pages/JobFormPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ApplicantsListPage from "./pages/ApplicantsListPage";
import ApplyPage from "./pages/ApplyPage";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageUsers from "./pages/admin/ManageUsers";
import Dashboard from "./pages/Dashboard";

function Profile() {
  return <div className="p-8">Logged in: Profile page</div>;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Service />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
          <Route path="post-job" element={<JobFormPage />} />
          {/* My Applications – jobseeker only */}
          <Route
            path="/my-applications"
            element={
              <RoleBasedRoute allowedRoles={["jobseeker"]}>
                <MyApplicationsPage />
              </RoleBasedRoute>
            }
          />

          {/* Applicants list – recruiter/admin */}
          <Route
            path="/jobs/:jobId/applicants"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <ApplicantsListPage />
              </RoleBasedRoute>
            }
          />

          {/* Recruiter/Admin Dashboard */}
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <Dashboard/>
              </RoleBasedRoute>
            }
          />

          {/* Job creation/editing */}
          <Route
            path="/jobs/create"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <JobFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/jobs/edit/:id"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <JobFormPage />
              </RoleBasedRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/manage-users"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/manage-jobs"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageJobs />
              </RoleBasedRoute>
            }
          />

          {/* Profile for any logged-in user */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
