// Code for the TaskForm component. This component is used to create and update tasks. It receives the onTaskCreated and onTaskUpdated props from the parent component. It contains a form with input fields for title, description, due date, and a checkbox for the status. It also contains a submit button that creates a new task or updates an existing task. The form fields are updated when the taskToEdit prop changes or is set. The form is reset after submission.
// Basically Handling the Form for the Task Manager
// Note: If it is taskToEdit, then it is just a prop holding a task object if it is taskToEdit() then it is a function call like onTaskUpdated and onTaskCreated
// Anything coming from the parent component is a prop and anything going to the parent component is a function call


import React, { useState, useEffect } from 'react'; // Hooks to manage form local state(default) & effects(when editing a task)
import api from './api/api'; // Import the Axios instance

// Acts as variable to store user input
const TaskForm = ({ onTaskCreated, taskToEdit, onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Populates form fields when about to edit a task
  useEffect(() => {
    if (taskToEdit) { // Note: taskToEdit is passed as a prop from the parent component App.js which is just the variable holding the task object to be edited
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate || '');
      setIsComplete(taskToEdit.isComplete || false);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsComplete(false);
    }
  }, [taskToEdit]); // This ensures the form fields are updated when taskToEdit changes

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent browser from refreshing the page

    if (!title.trim()) {
    alert("Task title is required!");
    return;
    }

    try {
      if (taskToEdit) {
        // Update an existing task
        const updatedTask = { ...taskToEdit, title, description, dueDate, isComplete }; // Update the task with new values by combining the old task with the new values using the spread operator (...)
        const response = await api.put(`/task/${taskToEdit.id}`, updatedTask);
        onTaskUpdated(response.data); // Notify parent of the updated task by calling the onTaskUpdated function to change the state of the tasks
      } else {
        // Create a new task
        const newTask = { title, description, dueDate, isComplete };
        const response = await api.post('/task', newTask);
        onTaskCreated(response.data); // Notify parent of the new task by calling the onTaskCreated function to change the state of the tasks
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert("Failed to create task. Please try again.");

    } finally {
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsComplete(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          Completed
        </label>
      </div>

      <button type="submit">{taskToEdit ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
