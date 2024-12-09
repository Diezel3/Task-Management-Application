import React, { useState, useEffect } from 'react';
import api from './api/api'; // Import the Axios instance


const TaskForm = ({ onTaskCreated, taskToEdit, onTaskUpdated }) => {
  // taskToEdit is used to pre-fill the form when editing
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : '');
  const [isComplete, setIsComplete] = useState(taskToEdit ? taskToEdit.isComplete : false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setIsComplete(taskToEdit.isComplete);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent the page from refreshing
    try {
        if (taskToEdit) {
            // Update an existing task
            const updatedTask = { ...taskToEdit, title, description, dueDate, isComplete };
            const response = await api.put(`/task/${taskToEdit.id}`, updatedTask);
            onTaskUpdated(response.data); // Inform the parent (App.js) about the updated task
        } else {
            // Create a new task
            const newTask = { title, description, dueDate, isComplete };
            const response = await api.post('/task', newTask); // Send to backend
            onTaskCreated(response.data); // Inform the parent (App.js) about the new task
        }
        setTitle('');
        setDescription('');
        setDueDate('');
        setIsComplete(false);
        } 
    catch (error) {
    console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update state as user types
          required
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
