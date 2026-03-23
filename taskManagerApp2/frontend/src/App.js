import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // add task
  const addTask = () => {
    if (!title.trim()) return;

    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTitle("");
      });
  };

  // delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  // toggle task
  const toggleTask = (task) => {
    fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((t) => (t.id === task.id ? updatedTask : t))
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Task Manager
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Task list */}
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-center text-gray-400">No tasks yet</p>
          )}

          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="w-4 h-4"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;