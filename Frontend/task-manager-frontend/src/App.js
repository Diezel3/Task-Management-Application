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
      }
    }

    fetchTasks();
  }, []);

  // Handles task editing
  const handleEditTask = (task) => {
    setTaskToEdit(task); // Set the selected task for editing
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

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm
        onTaskCreated={handleTaskCreated} // Handle task creation
        taskToEdit={taskToEdit} // Pass the task to edit
        onTaskUpdated={handleTaskUpdated} // Handle task updates
      />
      <TaskList tasks={tasks} onEdit={handleEditTask} />
    </div>
  );
};

export default App;
