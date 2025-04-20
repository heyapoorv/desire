import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Mock candidates data
const mockCandidates = [
  {
    id: 1,
    name: "John Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    experience: "3-5 years",
    education: "B.S. Computer Science",
    matchScore: 95,
    skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Redux"],
    bio: "Passionate frontend developer with 4 years of experience building responsive web applications."
  },
  {
    id: 2,
    name: "Emily Johnson",
    title: "Full Stack Engineer",
    location: "Remote",
    experience: "5-10 years",
    education: "M.S. Software Engineering",
    matchScore: 92,
    skills: ["Node.js", "React", "MongoDB", "Express", "AWS"],
    bio: "Full stack developer with expertise in MERN stack and cloud infrastructure."
  },
  {
    id: 3,
    name: "Michael Williams",
    title: "UX/UI Designer",
    location: "San Francisco, CA",
    experience: "3-5 years",
    education: "B.A. Design",
    matchScore: 88,
    skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    bio: "Designer focused on creating intuitive and delightful user experiences."
  },
  {
    id: 4,
    name: "Sarah Garcia",
    title: "Backend Developer",
    location: "Chicago, IL",
    experience: "1-3 years",
    education: "B.S. Computer Engineering",
    matchScore: 85,
    skills: ["Java", "Spring Boot", "SQL", "RESTful APIs", "Microservices"],
    bio: "Backend developer with strong fundamentals in Java and distributed systems."
  },
  {
    id: 5,
    name: "David Chen",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "3-5 years",
    education: "B.S. Computer Science",
    matchScore: 82,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    bio: "DevOps specialist with experience automating infrastructure and deployment pipelines."
  }
];

const CompanyDashboard = () => {
  const { currentUser } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [activeCandidateId, setActiveCandidateId] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [filterSkills, setFilterSkills] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For now, use mock data
    setCandidates(mockCandidates);
    setFilteredCandidates(mockCandidates);
    
    // Load saved job postings if they exist
    const savedJobPostings = localStorage.getItem("companyJobPostings");
    if (savedJobPostings) {
      setJobPostings(JSON.parse(savedJobPostings));
    }
  }, []);

  const handleAddJobPosting = (e) => {
    e.preventDefault();
    if (!jobTitle || !requiredSkills) return;

    const newPosting = {
      id: Date.now(),
      title: jobTitle,
      requiredSkills: requiredSkills.split(",").map(skill => skill.trim()),
      datePosted: new Date().toLocaleDateString()
    };

    const updatedPostings = [...jobPostings, newPosting];
    setJobPostings(updatedPostings);
    localStorage.setItem("companyJobPostings", JSON.stringify(updatedPostings));
    
    // Reset form
    setJobTitle("");
    setRequiredSkills("");
  };

  const handleDeleteJobPosting = (id) => {
    const updatedPostings = jobPostings.filter(posting => posting.id !== id);
    setJobPostings(updatedPostings);
    localStorage.setItem("companyJobPostings", JSON.stringify(updatedPostings));
  };

  const handleCandidateClick = (id) => {
    setActiveCandidateId(id === activeCandidateId ? null : id);
  };

  const handleFilterCandidates = () => {
    if (!filterSkills.trim()) {
      setFilteredCandidates(candidates);
      return;
    }

    const skills = filterSkills.toLowerCase().split(",").map(skill => skill.trim());
    
    const filtered = candidates.filter(candidate => {
      const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
      return skills.some(skill => candidateSkills.includes(skill));
    });
    
    setFilteredCandidates(filtered);
  };

  const activeCandidate = candidates.find(c => c.id === activeCandidateId);
  console.log("You are on the COMPANY dashboard");

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold">Welcome, {currentUser?.name || "Company User"}</h1>
          <p className="mt-2">Manage your job postings and find the perfect candidates for your open positions.</p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Job Postings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-black">Add New Job Posting</h2>
              <form onSubmit={handleAddJobPosting}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-black"
                    placeholder="e.g. React, JavaScript, HTML"
                  />
                </div>
                <button
                  type="submit"
                  className="!bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Post Job
                </button>
              </form>
            </div>
      
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-black">Your Job Postings</h2>
              {jobPostings.length === 0 ? (
                <p className="text-gray-500">No job postings yet. Create one above.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {jobPostings.map((posting) => (
                    <li key={posting.id} className="py-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{posting.title}</h3>
                          <p className="text-sm text-gray-500">Posted: {posting.datePosted}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {posting.requiredSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteJobPosting(posting.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
      
          {/* Right column - Candidates */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-black">Find Candidates</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={filterSkills}
                  onChange={(e) => setFilterSkills(e.target.value)}
                  className="text-black flex-grow px-3 py-2 border rounded-md"
                  placeholder="Filter by skills (e.g. React, AWS)"
                />
                <button
                  onClick={handleFilterCandidates}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Filter
                </button>
              </div>
      
              <div className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <div 
                    key={candidate.id} 
                    className={`py-4 px-2 cursor-pointer text-black transition ${activeCandidateId === candidate.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleCandidateClick(candidate.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{candidate.name}</h3>
                        <p className="text-gray-600">{candidate.title}</p>
                        <p className="text-sm text-gray-500">{candidate.location} • {candidate.experience} experience</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{candidate.matchScore}%</div>
                        <div className="text-xs text-gray-500">match</div>
                      </div>
                    </div>
                    
                    {activeCandidateId === candidate.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="mb-3">{candidate.bio}</p>
                        <div>
                          <h4 className="font-medium mb-1">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="font-medium mb-1">Education</h4>
                          <p className="text-sm">{candidate.education}</p>
                        </div>
                        <div className="mt-4">
                          <button className="!bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2">
                            Contact
                          </button>
                          <button className="border border-gray-300 text-white !bg-green-600  px-4 py-2 rounded-md hover:!bg-gray-50">
                            Save Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredCandidates.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    No candidates match your filter criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CompanyDashboard;
