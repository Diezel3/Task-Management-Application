import React, { useState } from 'react';
import api from './api/api'; // Import the Axios instance

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent the page from refreshing
    try {
        const newTask = { title, description, dueDate, isComplete };
        const response = await api.post('/task', newTask); // Send to backend
        console.log('Task created:', response.data); // Log the created task
      } catch (error) {
        console.error('Error creating task:', error);
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

      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
