

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   const [userType, setUserType] = useState("candidate");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     setLoading(true);
//     // Add sign-up logic here
//   };

//   const handleGoogleSignUp = () => {
//     setLoading(true);
//     // Add Google sign-up logic here
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
//           <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
//           <p className="text-lg text-center">
//             Create an account to explore job opportunities tailored for you.
//           </p>
//           <img
//             src="/images/signup-side.png"
//             alt="Sign Up Illustration"
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
//             Sign Up for Your Account
//           </h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* User Type */}
//             <div>
//               <label className="block font-medium text-gray-700 mb-2 text-lg">Sign Up as</label>
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

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-gray-700 mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
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
//               {loading ? "Signing Up..." : "Sign Up"}
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
//             onClick={handleGoogleSignUp}
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="w-5 h-5"
//             />
//             <span className="font-medium text-sm">
//               {loading ? "Signing up with Google..." : "Continue with Google"}
//             </span>
//           </button>

//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline font-medium">
//               Login
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await auth.createUserWithEmailAndPassword(email, password);
  //     navigate('/dashboard'); // Redirect to dashboard
  //   } catch (err) {
  //     console.error('Signup error: ', err);
  //     setError(err.message); // Display Firebase signup error
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
//       {/* Background Image */}
//       <img
//         src="/images/signup-bg.jpg"
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />
//       <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
//         >
//           <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
//           <p className="text-lg text-center">
//             Create your account and start exploring job opportunities.
//           </p>
//           <img
//             src="/images/signup-side.png"
//             alt="Signup Illustration"
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
//             Create Your Account
//           </h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
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
//                 placeholder="Create a password"
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
//               {loading ? "Creating account..." : "Sign Up"}
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
//               {loading ? "Signing up with Google..." : "Continue with Google"}
//             </span>
//           </button>

//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline font-medium">
//               Login
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';
// import {
//   getFirestore,
//   setDoc,
//   doc,
// } from 'firebase/firestore';
// import { app } from '../firebase';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('candidate'); // lowercase & consistent
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const isMounted = useRef(true);
//   const navigate = useNavigate();

//   const auth = getAuth(app);
//   const db = getFirestore(app);
//   const provider = new GoogleAuthProvider();

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Save or update Firestore user
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//         createdAt: new Date(),
//       });

//       // Redirect based on role
//       navigate(role === 'company' ? '/company-dashboard' : '/candidate-dashboard');
//     } catch (err) {
//       console.error('Google login error:', err);
//       if (isMounted.current) setError('Google login failed. Try again.');
//     } finally {
//       if (isMounted.current) setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//         createdAt: new Date(),
//       });

//       // Redirect
//       navigate(role === 'company' ? '/company-dashboard' : '/candidate-dashboard');
//     } catch (err) {
//       console.error('Signup error:', err);
//       if (isMounted.current) {
//         setError(err.message.includes("email-already") ? "Email already in use." : err.message);
//       }
//     } finally {
//       if (isMounted.current) setLoading(false);
//     }
//   };

  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
//       {/* Background Image */}
//       <img
//         src="/images/signup-bg.jpg"
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />
//       <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
//         >
//           <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
//           <p className="text-lg text-center">
//             Create your account and start exploring job opportunities.
//           </p>
//           <img
//             src="/images/signup-side.png"
//             alt="Signup Illustration"
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
//             Create Your Account
//           </h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
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
//                 placeholder="Create a password"
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
//               {loading ? "Creating account..." : "Sign Up"}
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
//               {loading ? "Signing up with Google..." : "Continue with Google"}
//             </span>
//           </button>

//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline font-medium">
//               Login
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

//working but it is redirecting to candidate dashboard in both cases
// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from 'firebase/auth';
// import {
//   getFirestore,
//   setDoc,
//   doc,
// } from 'firebase/firestore';
// import { app } from '../firebase';

// const InputField = ({ label, type, value, onChange, placeholder, required = true }) => (
//   <div>
//     <label className="block text-gray-700 mb-2">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       required={required}
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('candidate');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const isMounted = useRef(true);
//   const navigate = useNavigate();

//   const auth = getAuth(app);
//   const db = getFirestore(app);
//   const provider = new GoogleAuthProvider();

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

  
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
  
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       console.log("Selected role before writing to Firestore:", role);

//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//         createdAt: new Date(),
//       });
      
//       console.log("Navigating to:", role === 'company' ? '/company-dashboard' : '/candidate-dashboard');
      
  
//       console.log("User document created:", user.uid);
  
//       // Now that the document is created, navigate to the appropriate dashboard
//       navigate(role == 'company' ? '/company-dashboard' : '/candidate-dashboard');
//     } catch (err) {
//       console.error('Signup error:', err);
//       if (isMounted.current) {
//         setError(err.message.includes("email-already") ? "Email already in use." : err.message);
//       }
//     } finally {
//       if (isMounted.current) setLoading(false);
//     }
//   };
  
//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
  
//       // Create a new document in Firestore for the user
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//         createdAt: new Date(),
//       });
  
//       console.log(role); // Debugging role value
  
//       // Navigate to the dashboard based on the role
//       navigate(role == 'company' ? '/company-dashboard' : '/candidate-dashboard');
//     } catch (err) {
//       console.error('Google login error:', err);
//       if (isMounted.current) setError("Google login failed. Try again.");
//     } finally {
//       if (isMounted.current) setLoading(false);
//     }
//   };
  


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
//       <img
//         src="/images/signup-bg.jpg"
//         alt="Background"
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />
//       <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
//         {/* Left Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
//         >
//           <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
//           <p className="text-lg text-center">
//             Create your account and start exploring job opportunities.
//           </p>
//           <img
//             src="/images/signup-side.png"
//             alt="Signup Illustration"
//             className="mt-10 w-3/4"
//           />
//         </motion.div>

//         {/* Right Section - Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full md:w-1/2 p-10"
//         >
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//             Create Your Account
//           </h2>

//           {/* Error */}
//           {error && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm"
//             >
//               {error}
//             </motion.div>
//           )}
//           <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
//   <label className="text-gray-800 font-semibold text-xl mb-2 md:mb-0">Select Role:</label>
  
//   <div className="flex items-center gap-6">
//     <label className="inline-flex items-center gap-3 cursor-pointer hover:bg-blue-50 hover:shadow-lg p-3 rounded-lg transition-all duration-300 ease-in-out">
//       <input
//         type="radio"
//         name="role"
//         value="candidate"
//         checked={role === 'candidate'}
//         onChange={() => setRole('candidate')}
//         className="form-radio text-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
//       />
//       <span className="text-lg font-medium text-gray-800">Candidate</span>
//     </label>
    
//     <label className="inline-flex items-center gap-3 cursor-pointer hover:bg-blue-50 hover:shadow-lg p-3 rounded-lg transition-all duration-300 ease-in-out">
//       <input
//         type="radio"
//         name="role"
//         value="company"
//         checked={role === 'company'}
//         onChange={() => setRole('company')}
//         className="form-radio text-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
//       />
//       <span className="text-lg font-medium text-gray-800">Company</span>
//     </label>
//   </div>
// </div>


//           <form onSubmit={handleSubmit} className="space-y-5">
//             <InputField
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//             />

//             <InputField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Create a strong password"
//             />

           
            

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
//             >
//               {loading ? "Creating account..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-3 text-gray-500 text-sm">or</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google Sign-In */}
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
//               {loading ? "Signing up with Google..." : "Continue with Google"}
//             </span>
//           </button>

//           {/* Redirect to Login */}
//           <p className="text-center text-gray-600 mt-6 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline font-medium">
//               Login
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
} from 'firebase/firestore';
import { app } from '../firebase';

const InputField = ({ label, type, value, onChange, placeholder, required = true }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMounted = useRef(true);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });

      navigate(role === 'company' ? '/company-dashboard' : '/candidate-dashboard');
    } catch (err) {
      if (isMounted.current) {
        setError(err.message.includes("email-already") ? "Email already in use." : err.message);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: new Date(),
      });

      navigate(role === 'company' ? '/company-dashboard' : '/candidate-dashboard');
    } catch (err) {
      if (isMounted.current) setError("Google login failed. Try again.");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
      <img
        src="/images/signup-bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="z-10 bg-white shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white p-10"
        >
          <h2 className="text-4xl font-bold mb-4">Join Us!</h2>
          <p className="text-lg text-center">
            Create your account and start exploring job opportunities.
          </p>
          <img
            src="/images/signup-side.png"
            alt="Signup Illustration"
            className="mt-10 w-3/4"
          />
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-10"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Create Your Account
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

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

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

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
              {loading ? "Signing up with Google..." : "Continue with Google"}
            </span>
          </button>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;