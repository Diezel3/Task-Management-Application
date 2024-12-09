import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks

  // Handles new task creation
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {/* Pass handleTaskCreated to TaskForm */}
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} /> {/* Display the tasks */}
    </div>
  );
};

export default App;