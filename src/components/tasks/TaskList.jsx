// components/tasks/TaskList.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './tasks.css';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'

  // Fetch tasks from Firebase
  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Create query based on filter and sort
    let tasksQuery = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy(sortBy === 'newest' ? 'createdAt' : 'updatedAt', sortBy === 'newest' ? 'desc' : 'asc')
    );

    if (filter !== 'all') {
      tasksQuery = query(tasksQuery, where('completed', '==', filter === 'completed'));
    }

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
        setLoading(false);
      },
      (err) => {
        setError('Failed to load tasks');
        console.error("Error fetching tasks: ", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId, filter, sortBy]);

  const handleTaskAdded = () => {
    // The real-time listener will handle the update automatically
  };

  const handleTaskUpdated = () => {
    // The real-time listener will handle the update automatically
  };

  const handleTaskDeleted = () => {
    // The real-time listener will handle the update automatically
  };

  const filteredTasksCount = tasks.filter(task => 
    filter === 'all' ? true : 
    filter === 'completed' ? task.completed : !task.completed
  ).length;

  if (!projectId) {
    return (
      <div className="empty-state">
        <p>Select a project to view tasks</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
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
    <div className="task-list-container">
      <div className="task-list-header">
        <h3>Tasks</h3>
        <div className="task-controls">
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className="sort-dropdown">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <TaskForm projectId={projectId} onTaskAdded={handleTaskAdded} />

      <div className="task-count">
        {filteredTasksCount} {filteredTasksCount === 1 ? 'task' : 'tasks'} {filter !== 'all' && filter}
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Add your first task!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              projectId={projectId}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;