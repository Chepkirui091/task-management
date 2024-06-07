"use client"

import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async e => {
        console.log('clicked')
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/tasks', { title });
            // Check if fetchTasks is a function before calling it
            if (typeof fetchTasks === 'function') {
                fetchTasks(); // Fetch tasks again after creating a new task
            } else {
                console.error('fetchTasks is not a function');
            }
            setTitle(''); // Reset title input after submission
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };


    return (
        <div>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
