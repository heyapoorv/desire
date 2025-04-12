// // import React, { useState } from 'react';

// // const ResumeUpload = () => {
// //   const [file, setFile] = useState(null);
// //   const [parsedData, setParsedData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //     setParsedData(null);
// //     setError('');
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       return setError('⚠️ Please select a file to upload.');
// //     }

// //     const formData = new FormData();
// //     formData.append('resume', file);

// //     try {
// //       setLoading(true);
// //       setError('');
// //       const response = await fetch('http://localhost:5000/api/resume/upload', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (!response.ok) throw new Error(data?.error || 'Upload failed');

// //       setParsedData(data.extracted || data); // Handle both formats
// //     } catch (err) {
// //       setError(`❌ ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
// //       <h2>📄 Upload Resume for Parsing</h2>
      
// //       <input
// //         type="file"
// //         accept=".pdf,.doc,.docx"
// //         onChange={handleFileChange}
// //       />
// //       <br /><br />
      
// //       <button onClick={handleUpload} disabled={loading}>
// //         {loading ? 'Uploading...' : 'Upload & Parse'}
// //       </button>

// //       {error && <p style={{ color: 'red' }}>{error}</p>}

// //       {parsedData && (
// //         <div style={{ marginTop: '2rem', textAlign: 'left' }}>
// //           <h3>✅ Extracted Resume Data:</h3>
// //           <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
// //             {JSON.stringify(parsedData, null, 2)}
// //           </pre>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ResumeUpload;
// import React, { useState } from 'react';

// const ResumeUpload = () => {
//   const [file, setFile] = useState(null);
//   const [userId, setUserId] = useState(1);
//   const [isUploading, setIsUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file || !userId) {
//       setMessage("⚠️ Please select a file and enter a valid User ID.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // Multer field name
//     formData.append("userId", userId);

//     try {
//       setIsUploading(true);
//       setMessage("");

//       const res = await fetch("http://localhost:5000/api/resume/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Resume uploaded and parsed successfully!");
//         console.log("Parsed Resume:", data.resume);
//       } else {
//         setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       setMessage("❌ Error uploading resume. Check console.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h2>📄 Upload Resume</h2>
//       <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
//       <br /><br />
//       <input
//         type="number"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         placeholder="Enter User ID"
//         style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
//       />
//       <br />
//       <button
//         onClick={handleUpload}
//         disabled={isUploading}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: isUploading ? "#aaa" : "#007bff",
//           color: "blue",
//           border: "none",
//           cursor: isUploading ? "not-allowed" : "pointer",
//         }}
//       >
//         {isUploading ? "Uploading..." : "Upload Resume"}
//       </button>
//       <p style={{ marginTop: "15px", color: message.startsWith("✅") ? "green" : "red" }}>
//         {message}
//       </p>
//     </div>
//   );
// };

// export default ResumeUpload;


import React, { useState } from 'react';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !userId) {
      setMessage("⚠️ Please select a file and enter a valid User ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      setIsUploading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Resume uploaded and parsed successfully!");
        console.log("Parsed Resume:", data.resume);
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Error uploading resume. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "auto",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#333" }}>📄 Resume Upload Module</h2>
      <p style={{ color: "#666" }}>
        Resume upload functionality is available but currently hidden from UI.
      </p>

      {/* Hidden Form Elements (Still functional) */}
      <div style={{ display: "none" }}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>

      {/* Upload message display */}
      {message && (
        <p style={{
          marginTop: "15px",
          color: message.startsWith("✅") ? "green" : "red",
          fontWeight: 500
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
