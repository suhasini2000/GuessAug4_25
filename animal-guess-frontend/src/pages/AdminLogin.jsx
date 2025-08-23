import { useState } from "react";
import axios from "axios";
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
      const res = await axios.post("/api/token/", { username, password });
      localStorage.setItem("access_token", res.data.access);

      // Check if user is superuser
      const superRes = await axios.get("/api/check-superuser/", {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });
      localStorage.setItem("isAdmin", superRes.data.is_superuser ? "true" : "false");

      navigate("/admin-dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
     <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: "320px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2563eb" }}>
          Admin Login
        </h2>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e1"
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e1"
            }}
          />
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}