// import { useEffect, useState } from "react";
// import axios from "axios";

// function TestBackend() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/ping") // Backend endpoint
//       .then((res) => {
//         setMessage(res.data.message);  // "pong from backend 🚀"
//       })
//       .catch((err) => {
//         setMessage("Backend not reachable ❌");
//         console.error("Error:", err.message);
//       });
//   }, []);

//   return (
//     <div className="text-center mt-10">
//       <h2 className="text-xl font-bold">{message}</h2>
//     </div>
//   );
// }

// export default TestBackend;

import React, { useEffect, useState } from "react";
import { testBackend } from "../utils/api";

const TestBackendPage = () => {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await testBackend();
        setMessage(res?.message || "✅ Backend is working!");
      } catch (error) {
        setMessage("❌ Backend is not reachable.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Backend Test</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default TestBackendPage;
