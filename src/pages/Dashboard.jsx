// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ProjectList from "../components/projects/ProjectList";
import TaskList from "../components/tasks/TaskList";
import "./dashboard.css";
// import { Routes, Route } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);

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

    useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [selectedProject]);

  const handleAddProject = async (projectName) => {
    // Implémentez la logique d'ajout
  };

  const handleDeleteProject = async (projectId) => {
    // Implémentez la logique de suppression
  };

  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  // const { currentUser } = useAuth();
  // const [selectedProject, setSelectedProject] = useState(null);

  // if (!currentUser) {
  //   return (
  //     <div className="auth-required">
  //       <p>Please sign in to access the dashboard</p>
  //     </div>
  //   );
  // }

  // return (
  //   <div className={`dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
  //     <Header
  //       user={user}
  //       onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
  //     />

  //     <Sidebar
  //       collapsed={sidebarCollapsed}
  //       onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
  //     />

  //     <main className="dashboard-main">
  //       <div className="dashboard-content">
  //         <div className="projects-section">
  //           <ProjectList
  //             onProjectSelect={setSelectedProject}
  //           />
  //         </div>

  //         <div className="tasks-section">
  //           {selectedProject ? (
  //             <TaskList projectId={selectedProject} />
  //           ) : (
  //             <div className="empty-task-state">
  //               <h3>No Project Selected</h3>
  //               <p>Select a project from the list to view and manage tasks</p>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // );

  // export default Dashboard;
  return (
    <div className="dashboard">
      <Header user={user} />
      <div className="dashboard-content">
        <Sidebar />
        {/* <main className="main-content">
          <div className="projects-section">
            <ProjectList
              projects={projects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onDeleteProject={handleDeleteProject}
              onAddProject={handleAddProject}
            />
          </div>
          {/* {selectedProject && (
            <div className="tasks-section">
              <TaskList projectId={selectedProject} />
            </div>
          )} 
          <div className="tasks-section">
            {selectedProject ? (
              <TaskList projectId={selectedProject} />
            ) : (
              <div className="empty-task-state">
                <h3>No Project Selected</h3>
                <p>Select a project from the list to view and manage tasks</p>
              </div>
            )}
          </div>
        </main> */}

<main className="dashboard-main">
        <div className="dashboard-content">
          <div className="projects-section">
            <ProjectList 
              onProjectSelect={(projectId) => {
                setSelectedProject(projectId);
              }} 
            />
          </div>
          
          <div className="tasks-section">
            {selectedProject ? (
              <TaskList 
                key={key} // This ensures remount when project changes
                projectId={selectedProject} 
              />
            ) : (
              <div className="empty-task-state">
                <h3>No Project Selected</h3>
                <p>Select a project to view its tasks</p>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
