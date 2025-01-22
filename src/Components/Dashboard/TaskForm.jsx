import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ token, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status };

    try {
      if (taskToEdit) {
        // Update task
        await axios.put(`http://localhost:5000/api/tasks/${taskToEdit._id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(function (result) {
          if (result) {
            alert("Task Updated Successfully");
            window.location.reload();
          }
        })
      } else {
        // Create task
        await axios.post("http://localhost:5000/api/tasks", taskData, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(function (result) {
          console.log(result)
          if (result) {
            alert("task created successfully")
            window.location.reload();
          }
        })
      }
    } catch (err) {
      console.error("Error submitting task:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{taskToEdit ? "Update" : "Create"} Task</button>
    </form>
  );
};

export default TaskForm;
