// components/tasks/TaskForm.jsx
import { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './tasks.css';

const TaskForm = ({ projectId, onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      setError('Task name cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, "projects", projectId, "tasks"), {
        name: taskName,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Reset form and notify parent
      setTaskName('');
      setShowForm(false);
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      console.error("Error adding task: ", err);
      setError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!projectId) return null;

  return (
    <div className="task-form-container">
      {!showForm ? (
        <button 
          className="add-task-button"
          onClick={() => setShowForm(true)}
          disabled={!projectId}
        >
          <FiPlus className="icon" />
          <span>Add Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                setError('');
              }}
              placeholder="What needs to be done?"
              autoFocus
              disabled={isSubmitting}
              className={error ? 'has-error' : ''}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || !taskName.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setTaskName('');
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

export default TaskForm;