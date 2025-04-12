// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";

// import Home from "./pages/Home";
// import CompanyDashboard from "./pages/CompanyDashboard";
// import CandidateDashboard from "./pages/CandidateDashboard";
// import JobPreferencesForm from "./pages/JobPreferencesForm";
// import Roadmap from "./pages/Roadmap";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ResumeUpload from "./components/ResumeUpload";
// import TestBackendPage from "./pages/TestBackend";

// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./context/ProtectedRoute";
// import React from "react";
// //import ResumeUpload from "./ResumeUpload"; // adjust the path as needed

// function App() {
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/ping")
//       .then((res) => console.log("✅ Connected to backend:", res.data))
//       .catch((err) => console.error("❌ Backend not reachable:", err));
//   }, []);

//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <div className="container mx-auto p-6 min-h-screen">
//         <div className="App">
//       <ResumeUpload />
//     </div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/test-backend" element={<TestBackendPage />} />
//             <Route
//               path="/upload-resume"
//               element={
//                 <ProtectedRoute userType="candidate">
//                   <ResumeUpload />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/company-dashboard"
//               element={
//                 <ProtectedRoute userType="company">
//                   <CompanyDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/candidate-dashboard"
//               element={
//                 <ProtectedRoute userType="candidate">
//                   <CandidateDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/job-preferences"
//               element={
//                 <ProtectedRoute userType="candidate">
//                   <JobPreferencesForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/roadmap"
//               element={
//                 <ProtectedRoute userType="candidate">
//                   <Roadmap />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//         <Footer />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

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
import ResumeUpload from "./components/ResumeUpload";
import TestBackendPage from "./pages/TestBackend";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import React from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => console.log("✅ Connected to backend:", res.data))
      .catch((err) => console.error("❌ Backend not reachable:", err));
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-backend" element={<TestBackendPage />} />
            <Route
              path="/upload-resume"
              element={
                <ProtectedRoute userType="candidate">
                  <ResumeUpload />
                </ProtectedRoute>
              }
            />
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
