import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center w-full max-w-6xl px-6">
        <h1 className="text-6xl font-bold mb-6 text-blue-700 drop-shadow-md">
          SMART HIRE
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-800 leading-relaxed">
          Bridging the gap between talented candidates and forward-thinking companies. 
          Our AI-powered platform helps job seekers find the perfect role while enabling 
          companies to discover ideal candidates.
        </p>

        <div className="grid md:grid-cols-2 gap-10 w-full">
          {/* Job Seekers Section */}
          <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
            <div className="text-blue-600 mb-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">For Job Seekers</h3>
            <p className="text-gray-700 mb-5">
              Discover job opportunities, get personalized learning roadmaps, and track your career progress.
            </p>
            {!currentUser && (
              <Link
                to="/signup"
                className="!text-white inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Sign Up as Job Seeker
              </Link>
            )}
          </div>

          {/* Companies Section */}
          <div className="bg-white p-10 rounded-2xl shadow-lg transition hover:shadow-xl w-full">
            <div className="text-green-600 mb-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3">For Companies</h3>
            <p className="text-gray-700 mb-5">
              Use AI-powered candidate matching to find the perfect employees for your company.
            </p>
            {!currentUser && (
              <Link
                to="/signup"
                className="!text-white inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Sign Up as Employer
              </Link>
            )}
          </div>
        </div>

        {currentUser && (
          <div className="mt-8">
            <Link
              to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"}
              className="!text-white inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
