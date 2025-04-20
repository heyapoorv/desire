

// // Login.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getAuth, signInWithPopup } from "firebase/auth";

// import { initializeApp } from "firebase/app"; // Ensure this is present

// import { firebaseConfig } from "../firebase";  // Import the firebase config if it's exported separately

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);  // Use initializeApp here
// const auth = getAuth(app);


// import { provider } from "../firebase";  // Correctly import using named imports

// //import firebase from "../firebase";

// const LogIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("candidate");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { logIn } = useAuth();
//   const navigate = useNavigate();

//   // Function to handle navigation based on user type
//   const redirectToDashboard = (userType) => {
//     const dashboardRoute = userType === "company" ? "/company-dashboard" : "/candidate-dashboard";
//     navigate(dashboardRoute);
//   };

//   // Google login handler
//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       const auth = getAuth();
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("Google User:", user);

//       // Check and navigate based on user type
//       const storedUserType = localStorage.getItem("userType");
//       redirectToDashboard(storedUserType);
//     } catch (error) {
//       setError("Google login failed. Please try again.");
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form submission for email/password login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return setError("Please fill in all fields.");
//     }

//     try {
//       setError("");
//       setLoading(true);
//       await logIn(email, password, userType);
      
//       // Check and navigate based on user type
//       const storedUserType = localStorage.getItem("userType");
//       redirectToDashboard(storedUserType);
//     } catch (err) {
//       setError("Failed to sign in. Please check your credentials.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* User Type Selection */}
//           <div>
//             <label className="block text-gray-700 mb-2">I am a</label>
//             <div className="flex space-x-4">
//               <label className="flex items-center text-black">
//                 <input
//                   type="radio"
//                   value="candidate"
//                   checked={userType === "candidate"}
//                   onChange={() => setUserType("candidate")}
//                   className="mr-2"
//                 />
//                 Candidate
//               </label>
//               <label className="flex items-center text-black">
//                 <input
//                   type="radio"
//                   value="company"
//                   checked={userType === "company"}
//                   onChange={() => setUserType("company")}
//                   className="mr-2"
//                 />
//                 Company
//               </label>
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="!bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-lg transition duration-300"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//   {/* Google Login Button */}
// <div className="mt-6 text-center">
//   <button
//     onClick={handleGoogleLogin}
//     className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out disabled:opacity-60"
//     disabled={loading}
//   >
//     <img
//       src="https://www.svgrepo.com/show/475656/google-color.svg"
//       alt="Google Logo"
//       className="w-6 h-6"
//     />
//     <span className="font-semibold">
//       {loading ? "Logging in with Google..." : "Continue with Google"}
//     </span>
//   </button>
// </div>



//         {/* Sign Up Link */}
//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogIn;

// import { useState } from "react";
// import { GoogleAuthProvider } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { getAuth, signInWithPopup } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig, provider } from "../firebase";
// import { motion } from "framer-motion";
// //import { useAuth } from '../contexts/AuthContext';

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const LogIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState("candidate");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { logIn } = useAuth();
//   const navigate = useNavigate();

//   const redirectToDashboard = (type) => {
//     const route = type === "company" ? "/company-dashboard" : "/candidate-dashboard";
//     navigate(route);
//   };

//   const { signInWithGoogle } = useAuth();



//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const googleToken = await result.user.getIdToken(); // 🔑 Get the ID token
//       console.log("Received token:", googleToken);
  
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: googleToken }),
//       });
  
//       const contentType = response.headers.get("content-type");
// let data;

// if (contentType && contentType.includes("application/json")) {
//   data = await response.json();
// } else {
//   const rawText = await response.text();  // <- DEBUG
//   console.warn("Server returned non-JSON:", rawText);
//   throw new Error("Invalid response from server.");
// }

  
//       if (!response.ok) {
//         throw new Error(data.error || "Login failed");
//       }
  
//       console.log("Login success:", data);
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return setError("Please fill in all fields.");
//     }

//     try {
//       setLoading(true);
//       setError("");

//       await logIn(email, password, userType);
//       localStorage.setItem("userType", userType);
//       redirectToDashboard(userType);
//     } catch (err) {
//       console.error(err);
//       setError("Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
//       {/* Background Image */}
//       <img
//         src="/images/login-bg.jpg"
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />

//       <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
//         {/* Left Panel */}
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
//         >
//           <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
//           <p className="text-lg text-center">
//             Login to your account and explore job opportunities tailored for you.
//           </p>
//           <img
//             src="/images/login-side.png"
//             alt="Login Illustration"
//             className="mt-10 w-3/4"
//           />
//         </motion.div>

//         {/* Right Panel - Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 p-10"
//         >
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//             Login to Your Account
//           </h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* User Type */}
//             <div>
//               <label className="block font-medium text-gray-700 mb-2 text-lg">Login as</label>
//               <div className="flex gap-5">
//                 <label className="flex items-center text-gray-800 text-sm">
//                   <input
//                     type="radio"
//                     value="candidate"
//                     checked={userType === "candidate"}
//                     onChange={() => setUserType("candidate")}
//                     className="mr-3 accent-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
//                   />
//                   <span className="hover:text-blue-600 transition duration-300">Candidate</span>
//                 </label>
//                 <label className="flex items-center text-gray-800 text-sm">
//                   <input
//                     type="radio"
//                     value="employer"
//                     checked={userType === "employer"}
//                     onChange={() => setUserType("employer")}
//                     className="mr-3 accent-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-300 transform hover:scale-105"
//                   />
//                   <span className="hover:text-blue-600 transition duration-300">Employer</span>
//                 </label>
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-3 text-gray-500 text-sm">or</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google Button */}
//           <button
//             onClick={handleGoogleLogin}
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="w-5 h-5"
//             />
//             <span className="font-medium text-sm">
//               {loading ? "Logging in with Google..." : "Continue with Google"}
//             </span>
//           </button>

//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-blue-600 hover:underline font-medium">
//               Sign Up
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LogIn;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { motion } from "framer-motion";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const [role, setRole] = useState('candidate');

  const { logIn } = useAuth();
  const navigate = useNavigate();

  const redirectToDashboard = (type) => {
    const route = type === "company" ? "/company-dashboard" : "/candidate-dashboard";
    navigate(route);
  };

  const handleGoogleLogin = async () => {
    try {
      
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const googleToken = await result.user.getIdToken(); // Get the ID token
      console.log("Received token:", googleToken);

      const email = result.user.email; // Get email separately


      // Send the token to the server for verification
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken, email }),
      });
      

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const rawText = await response.text();  // Debugging
        console.warn("Server returned non-JSON:", rawText);
        throw new Error("Invalid response from server.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login success:", data);
      redirectToDashboard(data.userType); // Redirect based on user type (company or candidate)
    } catch (error) {
      console.error("Login Error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please fill in all fields.");
    }

    try {
      setLoading(true);
      setError("");

      await logIn(email, password, userType);
      localStorage.setItem("userType", userType);
      redirectToDashboard(userType);
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/login-bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
        >
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg text-center">
            Login to your account and explore job opportunities tailored for you.
          </p>
          <img
            src="/images/login-side.png"
            alt="Login Illustration"
            className="mt-10 w-3/4"
          />
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-10"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Login to Your Account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type */}
            <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
  <label className="text-gray-800 font-semibold text-xl mb-2 md:mb-0">Select Role:</label>
  
  <div className="flex items-center gap-6">
    <label className="inline-flex items-center gap-3 cursor-pointer hover:bg-blue-50 hover:shadow-lg p-3 rounded-lg transition-all duration-300 ease-in-out">
      <input
        type="radio"
        name="role"
        value="candidate"
        checked={role === 'candidate'}
        onChange={() => setRole('candidate')}
        className="form-radio text-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
      />
      <span className="text-lg font-medium text-gray-800">Candidate</span>
    </label>
    
    <label className="inline-flex items-center gap-3 cursor-pointer hover:bg-blue-50 hover:shadow-lg p-3 rounded-lg transition-all duration-300 ease-in-out">
      <input
        type="radio"
        name="role"
        value="company"
        checked={role === 'company'}
        onChange={() => setRole('company')}
        className="form-radio text-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
      />
      <span className="text-lg font-medium text-gray-800">Company</span>
    </label>
  </div>
</div>



            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-sm">
              {loading ? "Logging in with Google..." : "Continue with Google"}
            </span>
          </button>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LogIn;
