// components/projects/ProjectForm.jsx
import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './projects.css';

const ProjectForm = ({ onProjectAdded }) => {
  const [projectName, setProjectName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('Project name cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const docRef = await addDoc(collection(db, "projects"), {
        name: projectName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Callback to update parent component
      if (onProjectAdded) {
        onProjectAdded({
          id: docRef.id,
          name: projectName
        });
      }

      // Reset form
      setProjectName('');
      setShowForm(false);
    } catch (err) {
      console.error("Error adding project: ", err);
      setError('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="project-form-container">
      {!showForm ? (
        <button 
          className="add-project-button"
          onClick={() => setShowForm(true)}
        >
          <FiPlus className="icon" />
          <span>New Project</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
              autoFocus
              disabled={isSubmitting}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setProjectName('');
                setError('');
              }}
              disabled={isSubmitting}
            >
              <FiX />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectForm;