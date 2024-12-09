import React from 'react';

function TaskList({ tasks, onEdit }) {
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
              <button onClick={() => onEdit(task)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
