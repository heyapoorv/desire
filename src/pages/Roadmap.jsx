import React, { useState, useMemo } from 'react';

const Roadmap = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showRoadmap, setShowRoadmap] = useState(false);
  
  const skillCategories = useMemo(() => [
    {
      name: "Frontend",
      icon: "🎨",
      skills: ["HTML/CSS", "JavaScript", "React", "Vue", "Angular", "TypeScript"]
    },
    {
      name: "Backend",
      icon: "⚙️",
      skills: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby"]
    },
    {
      name: "Database",
      icon: "🗄️",
      skills: ["SQL", "MongoDB", "Firebase", "PostgreSQL", "Redis"]
    },
    {
      name: "DevOps",
      icon: "🚀",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
    },
    {
      name: "Mobile",
      icon: "📱",
      skills: ["React Native", "Flutter", "Swift", "Kotlin"]
    }
  ], []);
  
  // Learning resources for each skill
  const skillResources = useMemo(() => ({
    "HTML/CSS": {
      duration: "3 weeks",
      projects: 2,
      difficulty: "Beginner",
      resources: ["MDN Web Docs", "CSS Tricks", "freeCodeCamp"]
    },
    "JavaScript": {
      duration: "5 weeks",
      projects: 3,
      difficulty: "Beginner-Intermediate",
      resources: ["JavaScript.info", "Eloquent JavaScript", "freeCodeCamp"]
    },
    "React": {
      duration: "6 weeks",
      projects: 4,
      difficulty: "Intermediate",
      resources: ["React Docs", "React for Beginners", "React Patterns"]
    },
    // Resources for other skills would follow the same pattern
  }), []);
  
  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  const generateRoadmap = () => {
    setShowRoadmap(true);
  };
  
  const resetSelections = () => {
    setSelectedSkills([]);
    setShowRoadmap(false);
  };
  
  // Calculate optimal learning order
  const orderedSkills = useMemo(() => {
    // This is a simple implementation - a more sophisticated version would
    // take into account prerequisites and difficulty levels
    
    // Group skills by category
    const grouped = {};
    selectedSkills.forEach(skill => {
      for (const category of skillCategories) {
        if (category.skills.includes(skill)) {
          if (!grouped[category.name]) {
            grouped[category.name] = [];
          }
          grouped[category.name].push(skill);
          break;
        }
      }
    });
    
    // Start with fundamentals (HTML/CSS, JavaScript)
    const ordered = [];
    const fundamentals = ["HTML/CSS", "JavaScript"];
    fundamentals.forEach(skill => {
      if (selectedSkills.includes(skill)) {
        ordered.push(skill);
      }
    });
    
    // Add remaining skills grouped by category
    Object.entries(grouped).forEach(([category, skills]) => {
      skills.forEach(skill => {
        if (!ordered.includes(skill)) {
          ordered.push(skill);
        }
      });
    });
    
    return ordered;
  }, [selectedSkills, skillCategories]);
  
  // Different path styles for the roadmap (made more accessible with better contrast)
  const pathStyles = [
    { bg: "bg-blue-600", border: "border-blue-600", text: "text-blue-800" },
    { bg: "bg-purple-600", border: "border-purple-600", text: "text-purple-800" },
    { bg: "bg-green-600", border: "border-green-600", text: "text-green-800" },
    { bg: "bg-pink-600", border: "border-pink-600", text: "text-pink-800" },
    { bg: "bg-amber-600", border: "border-amber-600", text: "text-amber-800" }
  ];
  
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          Your Coding Adventure Map
        </h1>
        
        {!showRoadmap ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <p className="text-lg mb-4">
              Select the coding skills you want to learn, and we'll create a personalized learning journey for you!
            </p>
            
            <div className="grid gap-6 mt-8">
              {skillCategories.map((category) => (
                <div key={category.name} className="bg-slate-100 rounded-lg p-4">
                  <h2 className="text-xl font-semibold mb-3 text-indigo-600 flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedSkills.includes(skill)
                            ? "bg-indigo-600 text-white" 
                            : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                        aria-pressed={selectedSkills.includes(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col items-center">
              <p className="mb-4 text-indigo-700 font-medium">
                {selectedSkills.length > 0 
                  ? `${selectedSkills.length} skills selected` 
                  : "Select at least one skill to continue"}
              </p>
              <button
                onClick={generateRoadmap}
                disabled={selectedSkills.length === 0}
                className={`px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md transition-transform transform hover:scale-105 ${
                  selectedSkills.length > 0 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                aria-disabled={selectedSkills.length === 0}
              >
                Generate My Learning Adventure
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
              Your Personalized Learning Path
            </h2>
            
            <div className="relative">
              {/* Visual roadmap with milestones */}
              <div className="absolute left-8 top-4 bottom-4 w-2 bg-gray-200 rounded-full" 
                   aria-hidden="true"></div>
              
              {orderedSkills.map((skill, idx) => {
                const style = pathStyles[idx % pathStyles.length];
                const resources = skillResources[skill] || {
                  duration: "4 weeks",
                  projects: 3,
                  difficulty: "Intermediate",
                  resources: ["Online Documentation", "Practice Projects"]
                };
                
                return (
                  <div key={idx} className="relative pl-16 pb-12">
                    <div className={`absolute left-6 w-6 h-6 rounded-full border-4 border-white ${style.bg}`}
                         aria-hidden="true"></div>
                    <div className={`p-4 rounded-lg shadow-md border-l-4 ${style.border}`}>
                      <h3 className={`text-xl font-bold mb-2 ${style.text}`}>{skill}</h3>
                      <p className="mb-4">
                        Master the fundamentals of {skill} through hands-on projects and structured learning.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
                          {resources.duration}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
                          {resources.projects} projects
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
                          {resources.difficulty}
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium mb-2">Recommended Resources:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {resources.resources.map((resource, i) => (
                            <li key={i} className="text-gray-700">{resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Final milestone */}
              <div className="relative pl-16">
                <div className="absolute left-6 w-6 h-6 rounded-full border-4 border-white bg-green-600"
                     aria-hidden="true"></div>
                <div className="p-4 rounded-lg shadow-md border-l-4 bg-green-100 border-green-600">
                  <h3 className="text-xl font-bold mb-2 text-green-800">Congratulations!</h3>
                  <p className="mb-4">
                    You've completed your learning journey! Time to build something amazing with your new skills.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold mb-2">Next steps:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Create a personal project that combines your new skills</li>
                      <li>Join developer communities to share your progress</li>
                      <li>Consider exploring advanced topics in your favorite areas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
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