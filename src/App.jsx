import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CompanyDashboard from "./pages/CompanyDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import JobPreferencesForm from "./pages/JobPreferencesForm";
import Roadmap from "./pages/Roadmap";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/company-dashboard" 
              element={
                <ProtectedRoute userType="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidate-dashboard" 
              element={
                <ProtectedRoute userType="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/job-preferences" 
              element={
                <ProtectedRoute userType="candidate">
                  <JobPreferencesForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/roadmap" 
              element={
                <ProtectedRoute userType="candidate">
                  <Roadmap />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;