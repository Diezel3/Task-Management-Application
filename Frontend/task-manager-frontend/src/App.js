// Code to manage the task manager frontend. It fetches tasks from the backend, handles task editing, updates, creation, and deletion. It also renders the TaskForm and TaskList components.
// Basically Handling the active state of the Task Manager
import React, { useState, useEffect, useRef } from 'react';
import TaskForm from './TaskForm';
import TaskList from './components/TaskList';
import Register from './Register';
import Login from './Login';
import { deleteTask, getTasks } from './api/api';
import './styles.css';
import './authStyles.css';


const App = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [taskToEdit, setTaskToEdit] = useState(null); // State to manage task to edit
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const [currentPage, setCurrentPage] = useState('login'); // Track current page
  const [currentUser, setCurrentUser] = useState('');
  const formRef = useRef(null); // Ref to scroll to TaskForm when a task is about to be edited

  // Check for token when app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserName = localStorage.getItem('username');
    if (token) {
      setIsAuthenticated(true);
      setCurrentUser(savedUserName || 'User'); // Set the current user
      setCurrentPage('tasks');
    }
  }, []);
  
  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchTasks() {
      try {
        const response = await getTasks(); // API call to fetch tasks
        setTasks(response.data); // Set tasks fetched from the backend
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert("Failed to load tasks. Please try again.");
      }
    }

    fetchTasks();
  }, [isAuthenticated]); // Fetch tasks when the component loads and when the isAuthenticated state changes


  // On successful login, store the token and switch to tasks view
  const handleLoginSuccess = (token, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', userName);
    setIsAuthenticated(true);
    setCurrentPage('tasks'); // Switch to tasks view
    setCurrentUser(userName);
  };

  // On Logout, remove the token and switch to login view
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentUser('');
    setCurrentPage('login'); // Go back to login
  };

  // 5️⃣ Switch between login and register
  const switchPage = (page) => {
    setCurrentPage(page);
  };


  // This doesn't necessarily edit the task, but it sets the task ready to be edited and the logic is handled in the TaskForm component
  const handleEditTask = (task) => {
    const confirmEdit = window.confirm(`Are you sure you want to edit this (${task.title}) task?`); // Confirm before editing
    if (!confirmEdit) return;
    setTaskToEdit(task); // Set the selected task for editing by being an object of each task and passing it to the TaskForm component through the taskToEdit prop above

    // Scroll to TaskForm
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to form
    }
  };

  // Handles task updates
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null); // Clear the editing state
  };

  // Handles new task creation
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handles task deletion
  const handleTaskDeleted = async (taskId, taskTitle) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this (${taskTitle}) task?`); // Confirm before deleting
    if (!confirmDelete) return;

    
    try {
      await deleteTask(taskId); // API call to delete the task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Update state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  // Render the appropriate page based on the current page state
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        {currentPage === 'login' && (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onSwitchToRegister={() => switchPage('register')} 
          />
        )}
        {currentPage === 'register' && (
          <Register 
            onSwitchToLogin={() => switchPage('login')} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="navbar">
        <span className="user-info">Welcome, {currentUser || 'User'}!</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="app-container">
        <div className="task-form-section" ref={formRef}>
          <h2>Task Form</h2>
          <TaskForm 
            onTaskCreated={handleTaskCreated} // Handle task creation
            taskToEdit={taskToEdit} // Pass the task to edit
            onTaskUpdated={handleTaskUpdated} // Handle task updates
          />
        </div>
        <div className="task-list-section">
          <TaskList 
            tasks={tasks} 
            onEdit={handleEditTask} 
            onDelete={handleTaskDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
