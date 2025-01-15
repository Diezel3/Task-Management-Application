// Code to manage the task manager frontend. It fetches tasks from the backend, handles task editing, updates, creation, and deletion. It also renders the TaskForm and TaskList components.
// Basically Handling the active state of the Task Manager
import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './components/TaskList';
import api from './api/api';

const App = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [taskToEdit, setTaskToEdit] = useState(null); // State to manage task to edit

  // Fetch tasks from the backend when the component loads
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get('/task');
        setTasks(response.data); // Set tasks fetched from the backend
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert("Failed to load tasks. Please try again.");
      }
    }

    fetchTasks();
  }, []);

  // This doesn't necessarily edit the task, but it sets the task ready to be edited and the logic is handled in the TaskForm component
  const handleEditTask = (task) => {
    const confirmEdit = window.confirm(`Are you sure you want to edit this (${task.title}) task?`); // Confirm before editing
    if (!confirmEdit) return;
    setTaskToEdit(task); // Set the selected task for editing by being an object of each task and passing it to the TaskForm component through the taskToEdit prop above
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
      await api.delete(`/task/${taskId}`); // API call to delete the task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Update state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm
        onTaskCreated={handleTaskCreated} // Handle task creation
        taskToEdit={taskToEdit} // Pass the task to edit
        onTaskUpdated={handleTaskUpdated} // Handle task updates
      />
      <TaskList 
        tasks={tasks} 
        onEdit={handleEditTask} 
        onDelete={handleTaskDeleted}
      />
    </div>
  );
};

export default App;
