// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ProjectList from "../components/projects/ProjectList";
import TaskList from "../components/tasks/TaskList";
import "./dashboard.css";
import { Routes, Route } from 'react-router-dom'


const Dashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (projectName) => {
    // Implémentez la logique d'ajout
  };

  const handleDeleteProject = async (projectId) => {
    // Implémentez la logique de suppression
  };

  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  return (
    <div className="dashboard">
      <Header user={user} />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="projects-section">
            <ProjectList
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onDeleteProject={handleDeleteProject}
              onAddProject={handleAddProject}
            />
          </div>
          {selectedProject && (
            <div className="tasks-section">
              <TaskList projectId={selectedProject} />
            </div>
          )}
          {/* <Routes>
            <Route path="/projects" element={<Projects />} />
          </Routes> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
