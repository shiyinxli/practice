import { useEffect, useState } from "react";

function Home() {
  const [message, setMessage] = useState("");

  const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8080/api/hello", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const text = await response.text();
        setMessage(text);

      } catch (err) {
        setMessage("Access denied");
      }
    };


    fetchData();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;