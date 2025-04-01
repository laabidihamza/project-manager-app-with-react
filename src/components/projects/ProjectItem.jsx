// components/projects/ProjectItem.jsx
import './projects.css';

const ProjectItem = ({ project, isSelected, onSelect, onDelete }) => {
  return (
    <li 
      className={`project-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(project.id)}
    >
      <span className="project-name">{project.name}</span>
      <button 
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project.id);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
};

export default ProjectItem;