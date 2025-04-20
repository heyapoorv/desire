// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold flex items-center !text-white">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Resume Analyzer
//         </Link>

//         {/* Mobile Menu Button */}
//         <button 
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="md:hidden flex items-center px-3 py-2 border rounded border-white text-white hover:text-gray-300 transition"
//           aria-label="Toggle menu"
//         >
//           <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
//             <path 
//               fillRule="evenodd" 
//               d={isMenuOpen 
//                 ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 : "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//               } 
//               clipRule="evenodd" 
//             />
//           </svg>
//         </button>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-4 text-white">
//           <Link to="/" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Home</Link>
          
//           {currentUser ? (
//             <>
//               <Link to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"} 
//                 className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition"
//               >
//                 Dashboard
//               </Link>
//               {currentUser.userType !== "company" && (
//                 <>
//                   <Link to="/job-preferences" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Job Preferences</Link>
//                   <Link to="/roadmap" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Roadmap</Link>
//                 </>
//               )}
//               <button 
//                 onClick={handleLogout}
//                 className="!bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition !text-white"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white">Login</Link>
//               <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden pt-2 bg-blue-700 rounded-lg shadow-lg">
//           <div className="flex flex-col space-y-2 px-4 py-2">
//             <Link to="/" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            
//             {currentUser ? (
//               <>
//                 <Link to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"} 
//                   className="!text-white !bg-blue-600 px-4 py-2 rounded transition"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 {currentUser.userType !== "company" && (
//                   <>
//                     <Link to="/job-preferences" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Job Preferences</Link>
//                     <Link to="/roadmap" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Roadmap</Link>
//                   </>
//                 )}
//                 <button 
//                   onClick={handleLogout}
//                   className="!bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition !text-white text-left"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
//                 <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center !text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          SMART HIRE
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center px-3 py-2 border rounded border-white text-white hover:text-gray-300 transition"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path 
              fillRule="evenodd" 
              d={isMenuOpen 
                ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                : "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              } 
              clipRule="evenodd" 
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          <Link to="/" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Home</Link>
          
          {currentUser ? (
            <>
              <Link to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"} 
                className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Dashboard
              </Link>
              {currentUser.userType !== "company" && (
                <>
                  <Link to="/job-preferences" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Job Preferences</Link>
                  <Link to="/roadmap" className="!text-white hover:bg-blue-700 px-4 py-2 rounded transition">Roadmap</Link>
                  <Link to="/upload" className="!text-white px-4 py-2 rounded transition"> Upload </Link>
                </>
              )}
              <button 
                onClick={handleLogout}
                className="!bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition !text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white">Login</Link>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 bg-blue-700 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-2 px-4 py-2">
            <Link to="/" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
            
            {currentUser ? (
              <>
                <Link to={currentUser.userType === "company" ? "/company-dashboard" : "/candidate-dashboard"} 
                  className="!text-white !bg-blue-600 px-4 py-2 rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {currentUser.userType !== "company" && (
                  <>
                    <Link to="/job-preferences" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Job Preferences</Link>
                    <Link to="/roadmap" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Roadmap</Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="!bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition !text-white text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="!text-white hover:bg-blue-600 px-4 py-2 rounded transition" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition !text-white" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
