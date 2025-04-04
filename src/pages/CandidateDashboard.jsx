import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "New York, NY",
    salary: "$80,000 - $100,000",
    type: "Full-time",
    remote: "Remote",
    matchScore: 95,
    description: "We are seeking a skilled Frontend Developer proficient in React, JavaScript, and modern CSS frameworks.",
    skills: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "WebSolutions",
    location: "San Francisco, CA",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    remote: "Hybrid",
    matchScore: 88,
    description: "Join our team as a Full Stack Engineer working with React, Node.js, and AWS.",
    skills: ["React", "Node.js", "JavaScript", "AWS", "MongoDB"]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Digital",
    location: "Remote",
    salary: "$75,000 - $95,000",
    type: "Full-time",
    remote: "Remote",
    matchScore: 82,
    description: "Looking for a talented UI/UX Designer to create beautiful and functional interfaces for our clients.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"]
  },
  {
    id: 4,
    title: "React Native Developer",
    company: "AppWorks Mobile",
    location: "Boston, MA",
    salary: "$90,000 - $115,000",
    type: "Full-time",
    remote: "On-site",
    matchScore: 79,
    description: "Help us build cross-platform mobile applications using React Native and modern JavaScript.",
    skills: ["React Native", "JavaScript", "Mobile Development", "Redux"]
  },
  {
    id: 5,
    title: "Product Manager",
    company: "ProductX",
    location: "Seattle, WA",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    remote: "Hybrid",
    matchScore: 75,
    description: "Experienced Product Manager needed to lead our product development initiatives.",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"]
  }
];

// Mock skills gap data
const mockSkillGaps = [
  { skill: "React", proficiency: "Advanced", status: "mastered" },
  { skill: "JavaScript", proficiency: "Advanced", status: "mastered" },
  { skill: "Node.js", proficiency: "Intermediate", status: "in-progress" },
  { skill: "TypeScript", proficiency: "Beginner", status: "gap" },
  { skill: "AWS", proficiency: "None", status: "gap" },
  { skill: "GraphQL", proficiency: "None", status: "gap" }
];

const CandidateDashboard = () => {
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    // Load saved preferences if they exist
    const savedPreferences = localStorage.getItem("jobPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    // In a real app, we would fetch these from an API
    // For now, use mock data
    setJobs(mockJobs);
    setSkillGaps(mockSkillGaps);
  }, []);

  const calculateCompletionPercentage = () => {
    const masteredCount = skillGaps.filter(skill => skill.status === "mastered").length;
    return Math.round((masteredCount / skillGaps.length) * 100);
  };

  const handleJobClick = (job) => {
    setActiveJob(job);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Welcome, {currentUser?.name || "Candidate"}!</h1>
        <p className="mt-2">Here's your personalized job-seeking dashboard</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column - Profile Overview */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            
            {preferences ? (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">Seeking: <span className="font-medium text-gray-800">{preferences.jobTitle}</span></p>
                  <p className="text-gray-600">Location: <span className="font-medium text-gray-800">{preferences.location}</span></p>
                  <p className="text-gray-600">Experience: <span className="font-medium text-gray-800">{preferences.experience || "Not specified"}</span></p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Your Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {preferences.selectedSkills.map(skill => (
                      <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {preferences.selectedSkills.length === 0 && (
                      <p className="text-gray-500 text-sm italic">No skills specified</p>
                    )}
                  </div>
                </div>
                <Link
                  to="/job-preferences"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </Link>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Complete your job preferences to get personalized recommendations</p>
                <Link
                  to="/job-preferences"
                  className="!text-white bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Set Job Preferences
                </Link>
              </div>
            )}
          </div>

          {/* Skills Gap Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-xl font-semibold">Skills Progress</h2>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {calculateCompletionPercentage()}% Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${calculateCompletionPercentage()}%` }}
              ></div>
            </div>

            <div className="space-y-3">
              {skillGaps.map((skill) => (
                <div key={skill.skill} className="flex items-center justify-between text-black">
                  <div className="flex items-center">
                    <span 
                      className={`w-3 h-3 rounded-full mr-2 ${
                        skill.status === "mastered" ? "bg-green-500" :
                        skill.status === "in-progress" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-medium">{skill.skill}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-black">
                    {skill.proficiency}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to="/roadmap"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View Learning Roadmap
              </Link>
            </div>
          </div>
        </div>

        {/* Right column - Job Matches */}
        <div className="md:col-span-2">
          {activeJob ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{activeJob.title}</h2>
                  <p className="text-gray-600">{activeJob.company} • {activeJob.location}</p>
                </div>
                <button
                  onClick={() => setActiveJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                  {activeJob.matchScore}% Match
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {activeJob.type}
                </span>
                <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
                  {activeJob.remote}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Salary Range</h3>
                <p>{activeJob.salary}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
                <p className="text-gray-700">{activeJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {activeJob.skills.map(skill => (
                    <span key={skill} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
                  Apply Now
                </button>
                <button className="!text-white bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded border border-gray-300 transition duration-300">
                  Save Job
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Job Matches</h2>
                
                <div className="space-y-4">
                  {jobs.map(job => (
                    <div 
                      key={job.id}
                      onClick={() => handleJobClick(job)}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition duration-200"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{job.title}</h3>
                          <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                        </div>
                        <div className="bg-green-100 text-green-800 h-fit text-sm px-3 py-1 rounded-full font-medium">
                          {job.matchScore}% Match
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {job.type}
                        </span>
                        <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {job.remote}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;