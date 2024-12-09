import React, { useState, useEffect } from 'react';
import api from './api/api'; // Import the Axios instance

const TaskForm = ({ onTaskCreated, taskToEdit, onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // Update form fields when taskToEdit changes or is set
  useEffect(() => {
    if (taskToEdit) {
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
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        // Update an existing task
        const updatedTask = { ...taskToEdit, title, description, dueDate, isComplete };
        const response = await api.put(`/task/${taskToEdit.id}`, updatedTask);
        onTaskUpdated(response.data); // Notify parent of the updated task
      } else {
        // Create a new task
        const newTask = { title, description, dueDate, isComplete };
        const response = await api.post('/task', newTask);
        onTaskCreated(response.data); // Notify parent of the new task
      }
    } catch (error) {
      console.error('Error submitting task:', error);
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
