import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const login = () => {
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.text())
      .then(token => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
      })
      .catch(err => console.error(err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // auth header
  const authHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  // fetch tasks
  useEffect(() => {
    fetch("http://localhost:8080/tasks", {
      headers: authHeader(),
    })
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
        ...authHeader(),
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
      headers: authHeader(),
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
        ...authHeader(),
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-80">

          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 mb-4 rounded"
          />

          <button
            onClick={login}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="relative"><button
        onClick={logout}
        className="absolute top-4 right-4 text-sm text-gray-500 hover:text-red-500"
      >
        Logout
      </button></div>
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Task Manager
        </h1>

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
                  className={`${task.completed
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