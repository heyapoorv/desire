// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useRef } from "react";

// const Home = () => {
//   const { currentUser } = useAuth();
//   const fileInputRef = useRef(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Uploaded file:", file.name);
//       // You can send it to backend using FormData here
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/sample-resume.pdf"; // Make sure this file is in your public folder
//     link.download = "sample-resume.pdf";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
//       <div className="text-center w-full max-w-6xl px-6">
//         <h1 className="text-6xl font-bold mb-6 text-blue-700 drop-shadow-md">
//           Resume Analyzer
//         </h1>
//         <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
//           Bridging the gap between talented candidates and forward-thinking companies. 
//           Our AI-powered platform helps job seekers find the perfect role while enabling 
//           companies to discover ideal candidates.
//         </p>

//         <div className="grid md:grid-cols-2 gap-10 w-full">
//           {/* Job Seekers Section */}
//           <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
//             <div className="text-blue-600 mb-4 flex justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-3">For Job Seekers</h3>
//             <p className="text-gray-700 mb-5">
//               Discover job opportunities, get personalized learning roadmaps, and track your career progress.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="!text-white inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Sign Up as Job Seeker
//               </Link>
//             )}
//           </div>

//           {/* Companies Section */}
//           <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
//             <div className="text-green-600 mb-4 flex justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-3">For Companies</h3>
//             <p className="text-gray-700 mb-5">
//               Use AI-powered candidate matching to find the perfect employees for your company.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="!text-white inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Sign Up as Employer
//               </Link>
//             )}
//           </div>
//         </div>

//         {currentUser && (
//           <div className="mt-10 space-y-6">
//             <Link
//               to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"}
//               className="!text-white inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300"
//             >
//               Go to Dashboard
//             </Link>

//             {/* Upload Section */}
//             <div className="flex flex-col items-center space-y-4">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileUpload}
//                 className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm w-full max-w-md"
//               />
//               <button
//                 onClick={handleDownload}
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
//               >
//                 Download Sample Resume
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//   const { currentUser } = useAuth();
//   const fileInputRef = useRef(null);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("resume", file);

//     const [downloadUrl, setDownloadUrl] = useState("");


//     try {
//       setUploading(true);
//       setUploadStatus("Uploading...");
//       //await axios.post("http://localhost:5000/api/upload-resume", formData)

      
//       const response = await axios.post("http://localhost:5000/api/upload-resume", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setDownloadUrl(response.data.downloadUrl);
      

//       if (response.status === 200) {
//         setUploadStatus("✅ Resume processed successfully! You can now download the generated resume.");
//         setDownloadUrl(response.data.downloadUrl);
//         console.log("Parsed Data:", response.data);
//       } else {
//         setUploadStatus("❌ Failed to upload.");
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setUploadStatus("❌ Error during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = response?.data?.downloadUrl || "/generated-resume.pdf"; // Replace with backend-generated resume file
//     link.download = "Generated-Resume.pdf";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-6 py-12">
//       <div className="max-w-6xl w-full text-center space-y-10">
//         <h1 className="text-5xl md:text-6xl font-bold text-blue-800 drop-shadow-md">
//           Resume Analyzer
//         </h1>
//         <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
//           Upload your resume to get AI-powered insights, clean formatting, and personalized job recommendations.
//         </p>

//         {/* Info Cards */}
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Job Seekers */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <div className="flex justify-center mb-4 text-blue-600">
//               <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-blue-700">Job Seekers</h3>
//             <p className="text-gray-600 mb-4">
//               Upload your resume and receive actionable career guidance and formatting insights.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
//               >
//                 Sign Up as Job Seeker
//               </Link>
//             )}
//           </div>

//           {/* Companies */}
//           <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
//             <div className="flex justify-center mb-4 text-green-600">
//               <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-green-700">Employers</h3>
//             <p className="text-gray-600 mb-4">
//               Use AI-based resume parsing to shortlist highly relevant candidates quickly.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
//               >
//                 Sign Up as Employer
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Resume Upload & Download Section */}
//         {currentUser && (
//           <div className="mt-16">
//             <h2 className="text-3xl font-bold text-blue-800 mb-6">Upload Your Resume</h2>
//             <div className="bg-white p-8 rounded-2xl shadow-md flex flex-col items-center space-y-4 max-w-xl mx-auto">
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 className="border border-gray-300 px-4 py-2 rounded-lg w-full shadow-sm"
//               />
//               {uploadStatus && (
//                 <p className={`text-sm ${uploading ? "text-blue-600" : uploadStatus.includes("✅") ? "text-green-600" : "text-red-600"}`}>
//                   {uploadStatus}
//                 </p>
//               )}
//               <button
//                 onClick={handleDownload}
//                 disabled={uploading}
//                 className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
//               >
//                 Download Generated Resumes
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// ...imports
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { testBackend, resumeUpload } from "../utils/api";
import { UploadCloud } from "lucide-react"; // Optional icon

const Home = () => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    const check = async () => {
      const res = await testBackend();
      setBackendMessage(res?.message || "Backend is working!");
    };
    check();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !currentUser) return;

    try {
      setUploading(true);
      setUploadStatus("Uploading...");

      const result = await resumeUpload(file, currentUser.uid);
      setUploadStatus("✅ Resume uploaded successfully!");
      console.log("Upload Result:", result);
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus("❌ Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDownloadSample = () => {
    const link = document.createElement("a");
    link.href = "/sample-resume.pdf";
    link.download = "sample-resume.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Resume Analyzer</h1>
        <p className="text-gray-700 text-lg mb-6">
          {backendMessage || "Bridging the gap between talent and opportunity."}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            iconColor="text-blue-600"
            title="For Job Seekers"
            description="Discover job opportunities, personalized roadmaps, and track your career."
            signupLink="/signup"
            showLink={!currentUser}
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-700"
            btnText="Sign Up as Job Seeker"
          />

          <Card
            iconColor="text-green-600"
            title="For Companies"
            description="Find the perfect candidates with AI-powered matching."
            signupLink="/signup"
            showLink={!currentUser}
            bgColor="bg-green-600"
            hoverColor="hover:bg-green-700"
            btnText="Sign Up as Employer"
          />
        </div>

        {currentUser?.userType === "candidate" && (
          <div className="mt-10">
            <Link
              to="/candidate-dashboard"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Go to Dashboard
            </Link>

            <div className="mt-6 flex flex-col items-center gap-3">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Upload Button */}
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition duration-200"
              >
                <UploadCloud className="w-5 h-5" />
                Upload Resume (.pdf, .doc, .docx)
              </button>

              {/* Upload Status */}
              {uploadStatus && (
                <p className={`text-sm ${uploading ? "text-blue-600" : "text-green-600"}`}>
                  {uploadStatus}
                </p>
              )}

              {/* Download Sample */}
              <button
                onClick={handleDownloadSample}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg transition"
              >
                Download Sample Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ iconColor, title, description, signupLink, showLink, bgColor, hoverColor, btnText }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition w-full">
    <div className={`${iconColor} flex justify-center mb-4`}>
      <svg className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {showLink && (
      <Link
        to={signupLink}
        className={`inline-block text-white ${bgColor} ${hoverColor} py-2 px-4 rounded-lg font-medium transition`}
      >
        {btnText}
      </Link>
    )}
  </div>
);

export default Home;



// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useRef, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const { currentUser } = useAuth();
//   const fileInputRef = useRef(null);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [Uploading, setUploading] = useState(false);
//   const [uploadedFileName, setUploadedFileName] = useState("");

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file); // Must match multer config
//     formData.append("userId", currentUser?.uid || "guest");

//     try {
//       setUploading(true);
//       setUploadStatus("Uploading...");
//       setUploadedFileName(file.name);

//       const response = await axios.post("http://localhost:5000/api/resume/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200) {
//         setUploadStatus("✅ Resume uploaded successfully!");
//         console.log("Structured Data:", response.data);
//       } else {
//         setUploadStatus("❌ Upload failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("❌ Upload Error:", error);
//       setUploadStatus("❌ Error during upload.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/sample-resume.pdf";
//     link.download = "sample-resume.pdf";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
//       <div className="text-center w-full max-w-6xl px-6">
//         <h1 className="text-6xl font-bold mb-6 text-blue-700 drop-shadow-md">
//           Resume Analyzer
//         </h1>
//         <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
//           Bridging the gap between talented candidates and forward-thinking companies. 
//           Our AI-powered platform helps job seekers find the perfect role while enabling 
//           companies to discover ideal candidates.
//         </p>

//         <div className="grid md:grid-cols-2 gap-10 w-full">
//           {/* Job Seekers Section */}
//           <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
//             <div className="text-blue-600 mb-4 flex justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-3">For Job Seekers</h3>
//             <p className="text-gray-700 mb-5">
//               Discover job opportunities, get personalized learning roadmaps, and track your career progress.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="!text-white inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Sign Up as Job Seeker
//               </Link>
//             )}
//           </div>

//           {/* Companies Section */}
//           <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
//             <div className="text-green-600 mb-4 flex justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-semibold mb-3">For Companies</h3>
//             <p className="text-gray-700 mb-5">
//               Use AI-powered candidate matching to find the perfect employees for your company.
//             </p>
//             {!currentUser && (
//               <Link
//                 to="/signup"
//                 className="!text-white inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Sign Up as Employer
//               </Link>
//             )}
//           </div>
//         </div>

//         {currentUser && (
//           <div className="mt-10 space-y-6">
//             <Link
//               to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"}
//               className="!text-white inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300"
//             >
//               Go to Dashboard
//             </Link>

//             {/* Upload Resume Section */}
//             <div className="flex flex-col items-center space-y-4 mt-4">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileUpload}
//                 className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm w-full max-w-md"
//               />
//               {uploadedFileName && (
//                 <p className="text-sm text-gray-600">📄 File: {uploadedFileName}</p>
//               )}
//               {uploadStatus && (
//                 <p className={`text-sm ${uploadStatus.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
//                   {uploadStatus}
//                 </p>
//               )}
//               <button
//                 onClick={handleDownload}
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
//               >
//                 Download Sample Resume
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
