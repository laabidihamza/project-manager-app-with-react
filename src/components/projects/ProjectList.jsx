// components/projects/ProjectList.jsx
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';
import './projects.css';

const ProjectList = ({ 
  projects, 
  selectedProject, 
  onSelectProject, 
  onDeleteProject,
  onAddProject 
}) => {
  return (
    <div className="projects-container">
      <h2>Mes Projets</h2>
      <ProjectForm onAddProject={onAddProject} />
      <ProjectForm onProjectAdded={handleProjectAdded} />
      <ul className="projects-list">
        {projects.map(project => (
          <ProjectItem
            key={project.id}
            project={project}
            isSelected={selectedProject === project.id}
            onSelect={onSelectProject}
            onDelete={onDeleteProject}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

