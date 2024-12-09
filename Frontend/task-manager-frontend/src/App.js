import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [taskToEdit, setTaskToEdit] = useState(null); // State to manage task to edit

  // Handles new task creation
  // const handleTaskCreated = (newTask) => {
  //   setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
  // };

  const handleEditTask = (task) => {
    setTaskToEdit(task); // Set the selected task for editing
  };

  const handleTaskUpdated = (updatedTask) => {
    // Update the task in the list
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null); // Clear the editing state
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm
        onTaskCreated={(newTask) => setTasks((prevTasks) => [...prevTasks, newTask])}
        taskToEdit={taskToEdit} // Pass the task to edit
        onTaskUpdated={handleTaskUpdated} // Handle updates
      />
      <TaskList tasks={tasks} onEdit={handleEditTask} />
    </div>
  );
};

export default App;