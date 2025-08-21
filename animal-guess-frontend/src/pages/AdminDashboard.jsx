import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/admin-login");
      return;
    }
    axios
      .get("/api/check-superuser/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (!res.data.is_superuser) {
          alert("Only superusers can access this page.");
          localStorage.removeItem("access_token");
          navigate("/admin-login");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        navigate("/admin-login");
      });
  }, [navigate]);

  if (loading) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: "340px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#2563eb",
          }}
        >
          Admin Dashboard
        </h1>
        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
          <li>
            <button style={btnStyle} onClick={() => navigate("/add-animal")}>
              Add Animal
            </button>
          </li>
          <li>
            <button style={btnStyle} onClick={() => navigate("/list-animals")}>
              List Animals
            </button>
          </li>
          <li>
            <button style={btnStyle} onClick={() => navigate("/search-animal")}>
              Search Animal
            </button>
          </li>
          <li>
            <button style={btnStyle} onClick={() => navigate("/update-animal")}>
              Update Animal
            </button>
          </li>
        </ul>
        <button
          style={{
            ...btnStyle,
            background: "#e11d48",
            marginTop: "1rem",
          }}
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/admin-login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
};