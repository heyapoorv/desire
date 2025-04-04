import React, { useState } from 'react';

const Roadmap = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showRoadmap, setShowRoadmap] = useState(false);
  
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["HTML/CSS", "JavaScript", "React", "Vue", "Angular", "TypeScript"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby"]
    },
    {
      name: "Database",
      skills: ["SQL", "MongoDB", "Firebase", "PostgreSQL", "Redis"]
    },
    {
      name: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
    },
    {
      name: "Mobile",
      skills: ["React Native", "Flutter", "Swift", "Kotlin"]
    }
  ];
  
  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const generateRoadmap = () => {
    setShowRoadmap(true);
  };
  
  const resetSelections = () => {
    setSelectedSkills([]);
    setShowRoadmap(false);
  };
  
  // Different path styles for the roadmap
  const pathStyles = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500"
  ];
  
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center !text-indigo-700">Your Coding Adventure Map</h2>
        
        {!showRoadmap ? (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <p className="text-lg mb-4">Select the coding skills you want to learn, and we'll create a personalized learning journey for you!</p>
              
              <div className="grid gap-6 mt-8">
                {skillCategories.map((category, idx) => (
                  <div key={idx} className="bg-slate-100 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-600">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIdx) => (
                        <button
                          key={skillIdx}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedSkills.includes(skill)
                            ? "bg-indigo-600 !text-white" 
                            : "bg-white text-gray-400 hover:bg-gray-200"
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={generateRoadmap}
                  disabled={selectedSkills.length === 0}
                  className={`px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md transition-transform transform hover:scale-105 ${
                    selectedSkills.length > 0 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Generate My Learning Adventure
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-700">Your Personalized Learning Path</h3>
            
            <div className="relative">
              {/* Visual roadmap with milestones */}
              <div className="absolute left-8 top-4 bottom-4 w-2 bg-gray-200 rounded-full"></div>
              
              {selectedSkills.map((skill, idx) => (
                <div key={idx} className="relative pl-16 pb-12">
                  <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-white ${pathStyles[idx % pathStyles.length]}`}></div>
                  <div className={`p-4 rounded-lg shadow-md border-l-4 ${pathStyles[idx % pathStyles.length]}`}>
                    <h4 className="text-xl font-bold mb-2">{skill}</h4>
                    <p className="mb-4">Master the fundamentals of {skill} through hands-on projects and challenges.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black">~4 weeks</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black">3 projects</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black" >Beginner-friendly</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Final milestone */}
              <div className="relative pl-16">
                <div className="absolute left-6 w-6 h-6 rounded-full border-4 border-white bg-green-500"></div>
                <div className="p-4 rounded-lg shadow-md border-l-4 bg-green-400 border-green-500">
                  <h4 className="text-xl font-bold mb-2 ">Congratulations!</h4>
                  <p>You've completed your learning journey! Time to build something amazing with your new skills.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={resetSelections}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition-all"
              >
                Create a New Path
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;