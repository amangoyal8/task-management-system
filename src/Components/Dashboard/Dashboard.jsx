import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [token, setToken] = useState();
  const [role, setRole] = useState();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const sessionData = sessionStorage.getItem('scKey');
    const role = sessionStorage.getItem('role');
    if (!sessionData) {
      alert("Please Log in First...");
      nav('/');
      return;
    }
    setToken(sessionData)
    setRole(role)
  }, [])

  return (
    <>
      <h1>Task Management</h1>
      <TaskForm token={token} taskToEdit={taskToEdit} />
      <TaskList role={role} token={token} onEdit={(task) => setTaskToEdit(task)} />

    </>
  )
}

export default Dashboard
