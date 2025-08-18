import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // <-- Add this if not using a preconfigured api instance

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Use axios directly, or make sure your api instance is set up with the correct baseURL
      const res = await axios.post("/api/token/", { username, password });
      // Store token as "access_token" for consistency
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      navigate("/admin-dashboard");
    } catch (err) {
      setError("Invalid login credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}