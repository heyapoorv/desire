import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return setError("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      const user = await signUp(email, password, userType);

      // Redirect based on user type
      localStorage.setItem("userType", userType); // <- add this before redirect

      if (userType === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/job-preferences");
      }
      
    } catch (err) {
      setError("Failed to create an account");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div>
            <label className="block text-gray-700 mb-2">I am a</label>
            <div className="flex space-x-4">
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  value="candidate"
                  checked={userType === "candidate"}
                  onChange={() => setUserType("candidate")}
                  className="mr-2"
                />
                Job Seeker
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  value="company"
                  checked={userType === "company"}
                  onChange={() => setUserType("company")}
                  className="mr-2"
                />
                Employer
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
              placeholder="Enter your email" 
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900" 
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
              placeholder="Create a password" 
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900" 
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm your password" 
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900" 
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 w-full rounded-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
