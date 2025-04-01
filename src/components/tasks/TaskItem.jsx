// components/tasks/TaskItem.jsx
import { useState } from 'react';
import { FiCheck, FiTrash2, FiEdit2, FiMoreVertical } from 'react-icons/fi';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './tasks.css';

const TaskItem = ({ task, projectId, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setIsUpdating(true);
      await updateDoc(doc(db, "projects", projectId, "tasks", task.id), {
        completed: !task.completed,
        updatedAt: new Date().toISOString()
      });
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task: ", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "projects", projectId, "tasks", task.id));
      if (onTaskDeleted) onTaskDeleted();
    } catch (err) {
      console.error("Error deleting task: ", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim()) return;
    
    try {
      setIsUpdating(true);
      await updateDoc(doc(db, "projects", projectId, "tasks", task.id), {
        name: editedName,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task: ", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              autoFocus
              className="edit-input"
            />
            <div className="edit-actions">
              <button 
                onClick={handleSaveEdit}
                disabled={isUpdating}
                className="save-button"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(task.name);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-main">
              <button
                onClick={handleToggleComplete}
                disabled={isUpdating}
                className={`complete-button ${task.completed ? 'completed' : ''}`}
                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {task.completed && <FiCheck className="check-icon" />}
              </button>
              <div className="task-details">
                <span className="task-name">{task.name}</span>
                {task.createdAt && (
                  <span className="task-date">
                    {formatDate(task.createdAt)}
                  </span>
                )}
              </div>
            </div>
            <div className="task-actions">
              <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
                <button 
                  className="menu-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Task options"
                >
                  <FiMoreVertical />
                </button>
                <div className="dropdown-content">
                  <button 
                    onClick={() => {
                      setIsEditing(true);
                      setIsMenuOpen(false);
                    }}
                    className="dropdown-item"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    onClick={handleDeleteTask}
                    disabled={isDeleting}
                    className="dropdown-item delete"
                  >
                    <FiTrash2 /> {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;