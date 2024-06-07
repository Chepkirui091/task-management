"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/tasklist/page';
import TaskForm from '../components/taskform/page';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks once when component mounts

  return (
      <div>
        <h1>Task Management Application</h1>
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} />
      </div>
  );
};

export default Home;
