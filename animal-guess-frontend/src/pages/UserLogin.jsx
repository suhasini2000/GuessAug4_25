import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [tab, setTab] = useState(0); // 0: Sign In, 1: Sign Up
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/gameuser-login/", signInData);
      if (res.data.success) {
        localStorage.setItem("user", signInData.username);
        navigate("/games"); // Redirect to home or user dashboard
      } else {
        setError("Invalid credentials.");
      }
    } catch {
      setError("Error during sign in");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/gameuser-register/", signUpData);
      setTab(0);
      setSignInData({ username: signUpData.username, password: "" });
    } catch (err) {
      setError(
        err.response?.data?.username?.[0] ||
        err.response?.data?.password?.[0] ||
        "Error during sign up"
      );
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
      <div style={{
        background: "#fff",
        padding: "2rem 2.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        minWidth: "320px"
      }}>
        <div style={{ display: "flex", marginBottom: "1.5rem" }}>
          <button
            onClick={() => { setTab(0); setError(""); }}
            style={{
              flex: 1,
              border: "none",
              borderBottom: tab === 0 ? "2px solid #2563eb" : "2px solid #e5e7eb",
              background: "none",
              color: tab === 0 ? "#2563eb" : "#64748b",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "0.5rem",
              cursor: "pointer"
            }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setTab(1); setError(""); }}
            style={{
              flex: 1,
              border: "none",
              borderBottom: tab === 1 ? "2px solid #2563eb" : "2px solid #e5e7eb",
              background: "none",
              color: tab === 1 ? "#2563eb" : "#64748b",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "0.5rem",
              cursor: "pointer"
            }}
          >
            SIGN UP
          </button>
        </div>
        {tab === 0 ? (
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Username"
              value={signInData.username}
              onChange={e => setSignInData({ ...signInData, username: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                marginBottom: "1rem"
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={signInData.password}
              onChange={e => setSignInData({ ...signInData, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                marginBottom: "1rem"
              }}
            />
            {error && <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
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
              SIGN IN
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={signUpData.username}
              onChange={e => setSignUpData({ ...signUpData, username: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                marginBottom: "1rem"
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                marginBottom: "1rem"
              }}
            />
            {error && <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
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
              SIGN UP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}