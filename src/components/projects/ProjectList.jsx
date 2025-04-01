// components/projects/ProjectList.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';
import './projects.css';

const ProjectList = ({ onProjectSelect }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch projects from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
        setLoading(false);
      },
      (err) => {
        setError('Failed to load projects');
        console.error("Error fetching projects: ", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      // Delete all tasks under this project first if needed
      // (You might want to implement this)
      
      // Then delete the project
      await deleteDoc(doc(db, "projects", projectId));
      
      // If the deleted project was selected, clear selection
      if (selectedProject === projectId) {
        setSelectedProject(null);
        if (onProjectSelect) onProjectSelect(null);
      }
    } catch (err) {
      setError('Failed to delete project');
      console.error("Error deleting project: ", err);
    }
  };

  const handleProjectAdded = (newProject) => {
    // The real-time listener will handle the update automatically
    // Select the new project by default
    setSelectedProject(newProject.id);
    if (onProjectSelect) onProjectSelect(newProject.id);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
    if (onProjectSelect) onProjectSelect(projectId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h2>Projects</h2>
        <span className="project-count">{projects.length} projects</span>
      </div>

      <ProjectForm onProjectAdded={handleProjectAdded} />

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create your first project!</p>
        </div>
      ) : (
        <ul className="project-list">
          {projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
              isSelected={selectedProject === project.id}
              onSelect={handleProjectSelect}
              onDelete={handleDeleteProject}
            />
          ))}
        </ul>
      )}
      {console.log(selectedProject)}
    </div>
  );
};

export default ProjectList;