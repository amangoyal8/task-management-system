import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = ({ role, token, onEdit }) => {
  console.log(token, "token")
  const [tasks, setTasks] = useState();
  const [filter, setFilter] = useState("sel");
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params: filter ? { status: filter } : {},
      });
      // console.log(data)
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);
  useEffect(() => {
    console.log(tasks);

    if (tasks === undefined || tasks === null)
      console.log(tasks);
    setFilter("")

  }, [])
  const deleteTask = async (id) => {
    console.log(id, "to delete")
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(function (result) {
        console.log(result)
        if (result) {
          alert("Task Deleted Successfully");
          fetchTasks();
        }
      })
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>{role === "Admin" ? "All Tasks" : "My Tasks"}</h2>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="sel">--SELECT--</option>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
