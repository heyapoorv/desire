import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const skills = [
  "JavaScript", "React", "Node.js", "Python", "Java", "AWS", 
  "Data Analysis", "Machine Learning", "Product Management", 
  "Digital Marketing", "UI/UX Design", "SQL", "DevOps", "Communication"
];

const industries = [
  "Technology", "Finance", "Healthcare", "Education", 
  "Marketing", "Manufacturing", "Retail", "Media & Entertainment"
];

const JobPreferencesForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    remotePreference: "no-preference",
    salary: "",
    experience: "",
    selectedSkills: [],
    selectedIndustries: [],
    bio: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load saved preferences if they exist
  useEffect(() => {
    const savedPreferences = localStorage.getItem("jobPreferences");
    if (savedPreferences) {
      setFormData(JSON.parse(savedPreferences));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => {
      if (prev.selectedSkills.includes(skill)) {
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter(s => s !== skill)
        };
      } else {
        return {
          ...prev,
          selectedSkills: [...prev.selectedSkills, skill]
        };
      }
    });
  };

  const handleIndustryToggle = (industry) => {
    setFormData(prev => {
      if (prev.selectedIndustries.includes(industry)) {
        return {
          ...prev,
          selectedIndustries: prev.selectedIndustries.filter(i => i !== industry)
        };
      } else {
        return {
          ...prev,
          selectedIndustries: [...prev.selectedIndustries, industry]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.jobTitle || !formData.location) {
      return setError("Job title and location are required");
    }
    
    try {
      setError("");
      setLoading(true);
      
      // In a real app, this would be an API call
      // For now, just save to localStorage
      localStorage.setItem("jobPreferences", JSON.stringify(formData));
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/candidate-dashboard");
      }, 2000);
    } catch (err) {
      setError("Failed to save preferences");
      console.error(err);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Job Preferences</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your ideal job to help us match you with the best opportunities
          and create a personalized learning roadmap.
        </p>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Preferences saved successfully! Redirecting to dashboard...
        </div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Desired Job Title*</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g., Front-end Developer"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Preferred Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Remote Work Preference</label>
            <select
              name="remotePreference"
              value={formData.remotePreference}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="no-preference">No Preference</option>
              <option value="remote-only">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site Only</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Expected Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $60,000 - $80,000"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Select Experience Level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${formData.selectedSkills.includes(skill) 
                      ? 'bg-blue-400 text-gray-100 font-semibold'  // Selected: Slightly darker white, not too strong
                      : 'bg-gray-200 text-gray-400 hover:text-gray-200 hover:bg-gray-300' // Default: Softer contrast
                                
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Preferred Industries</label>
            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => handleIndustryToggle(industry)}
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${formData.selectedIndustries.includes(industry) 
                      ? 'bg-blue-400 text-gray-100 font-semibold'  // Selected: Slightly darker white, not too strong
                      : 'bg-gray-200 text-gray-400 hover:text-gray-200 hover:bg-gray-300' // Default: Softer contrast
                    }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Professional Summary</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Briefly describe your background and career goals..."
              rows="4"
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPreferencesForm;