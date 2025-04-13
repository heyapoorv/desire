import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setError("");
      setLoading(true);

      const user = await login(email, password, userType);

      // Redirect based on user type
      if (user.userType === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }
    } catch (err) {
      setError("Failed to sign in");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div>
            <label className="block text-gray-700 mb-2">User Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  value="candidate"
                  checked={userType === "candidate"}
                  onChange={() => setUserType("candidate")}
                  className="mr-2"
                />

                Candidate
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  value="company"
                  checked={userType === "company"}
                  onChange={() => setUserType("company")}
                  className="mr-2"
                />
                Company
              </label>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" 
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" 
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="!bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-lg transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
