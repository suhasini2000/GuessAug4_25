import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call Django backend JWT endpoint
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // Save tokens
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Check if user is superuser
      const userRes = await fetch("http://127.0.0.1:8000/api/check-admin/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      if (!userRes.ok) {
        throw new Error("Not authorized");
      }

      const userData = await userRes.json();
      if (userData.is_superuser) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin-dashboard");
      } else {
        setError("You are not an admin!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}