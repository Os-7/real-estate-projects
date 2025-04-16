"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// Dynamically import the ProjectMap component with ssr: false
import dynamic from "next/dynamic";
import Header from "../../component/Header"; // Import the Header component

const ProjectMap = dynamic(() => import("../../component/projectMap"), {
  ssr: false,
});

const CityPage = () => {
  const { cityName } = useParams();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.post("/api/scrape", { cityName });
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (cityName) fetchProjects();
  }, [cityName]);

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project when clicked
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!projects.length) {
    return (
      <div className="text-center text-xl mt-20">
        Loading projects in {cityName}...
      </div>
    );
  }

  return (
    <div>
      <Header cityName={cityName} searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="container mx-auto p-6 pt-0">
        {/* Flexbox Layout */}
        <div className="flex gap-x-8 h-[100%]">
          {/* Left Side: Project Details */}
          <div className="w-[50%] p-4 pt-0 h-[80vh] overflow-y-auto mt-6 hide-scrollbar">
            {filteredProjects.map((project, i) => (
              <div
                key={i}
                className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white mb-6 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all"
                onClick={() => handleProjectClick(project)} // On click, select the project
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {project.name}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    <strong>Location:</strong> {project.location}
                  </p>
                  <p className="text-gray-500 mt-1">
                    <strong>Price:</strong> {project.priceRange}
                  </p>
                  <p className="text-gray-500 mt-1">
                    <strong>Builder:</strong> {project.builder}
                  </p>
                  <p className="text-gray-500 mt-1">
                    <strong>BHK:</strong> {project.bhk}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Map */}
          <div className="flex-1 h-[80vh] mt-6">
            <ProjectMap
              projects={projects}
              selectedProject={selectedProject} // Pass selected project to map
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
