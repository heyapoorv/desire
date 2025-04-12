import axios from "axios";

// ✅ Replace with your backend URL (localhost or deployed Railway backend)
const BASE_URL = "http://localhost:5000"; 

// 🔁 Test backend connection
export const testBackend = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/test`);
    return res.data;
  } catch (err) {
    console.error("Backend connection failed:", err.message);
  }
};

// 📤 Upload resume file
export const resumeUpload = async (file, userId) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Server responded with error:", data);
      throw new Error(data.message || "Upload failed");
    }

    return data;
  } catch (error) {
    console.error("Resume Upload Error:", error);
    throw error;
  }
};


