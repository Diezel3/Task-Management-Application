import React, { useEffect, useState } from 'react';
import api from '../api/api';

    function TaskList({ onEdit }) { // 'onEdit' prop to handle editing
        const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await api.get('/task');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);


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
