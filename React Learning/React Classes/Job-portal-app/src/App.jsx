import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import JobListingPage from "./pages/JobListingPage";
import JobDetailPage from "./pages/JobDetailPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import ApplicationPage from "./pages/ApplicationPage";
import PostJobPage from "./pages/PostJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./common/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
          <Route path="/jobs" element={<JobListingPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/applications" element={<ApplicationPage />} />
          <Route path="/company/post-job" element={<PostJobPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
