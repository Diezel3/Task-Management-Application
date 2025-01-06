// This component displays the list of tasks. It receives the tasks, onEdit, and onDelete props from the parent component. It displays the tasks in a list format. If there are no tasks available, it displays a message. If there are tasks available, it displays the task title, description, and status. It also displays the Edit and Delete buttons for each task.
// Basically Handling the UI for the Task List
import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>
              <button onClick={() => onEdit(task)}>Edit</button> // the onEdit function is called when the Edit button is clicked
              <button onClick={() => onDelete(task.id)}>Delete</button> // the onDelete function is called with the task ID when the Delete button is clicked
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
