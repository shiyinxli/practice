import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // add task
  const addTask = () => {
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        completed: false
      })
    })
    .then(res => res.json())
    .then(newTask => {
      setTasks([...tasks, newTask]);
      setTitle("");
    });
  };

  // delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  const toggleTask = (task) => {
    fetch(`http://localhost:8080/tasks/${task.id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    })
    .then(res => res.json())
    .then(updatedTask => {
      setTasks(tasks.map(t =>
        t.id === task.id ? updatedTask : t
      ));
    });
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
           <input
            type="checkbox"
            checked = {task.completed}
            onChange = {() => toggleTask(task)}
            />
            <span style={{textDecoration: task.completed ? "line-through": "none"}}>
              {task.title}
            </span>
            <button onClick = {() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;