import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("/api/animals/", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => setAnimals(res.data))
      .catch(() => setError("Failed to load animals."));
  }, []);

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (window.confirm("Are you sure you want to delete this animal?")) {
      setDeletingId(id);
      try {
        await axios.delete(`/api/animals/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setAnimals(animals.filter(animal => animal.id !== id));
      } catch {
        setError("Failed to delete animal.");
      } finally {
        setDeletingId(null);
      }
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
        minWidth: "700px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#2563eb" }}>
          All Animals
        </h1>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "1.5rem"
          }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Uploaded At</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {animals.map(animal => (
                <tr key={animal.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}>{animal.id}</td>
                  <td style={tdStyle}>{animal.name}</td>
                  <td style={tdStyle}>
                    {animal.image && (
                      <img src={animal.image} alt={animal.name} width={80} style={{ borderRadius: 8 }} />
                    )}
                  </td>
                  <td style={tdStyle}>{animal.uploaded_at}</td>
                  <td style={tdStyle}>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(animal.id)}
                      disabled={deletingId === animal.id}
                    >
                      {deletingId === animal.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          style={dashboardBtnStyle}
          onClick={() => navigate("/admin-dashboard")}
        >
          Go to Admin Dashboard
        </button>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "0.75rem",
  textAlign: "left",
  color: "#334155",
  fontWeight: "bold",
  borderBottom: "2px solid #e5e7eb"
};

const tdStyle = {
  padding: "0.75rem",
  color: "#334155"
};

const deleteBtnStyle = {
  padding: "0.4rem 1rem",
  background: "#e11d48",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};

const dashboardBtnStyle = {
  width: "100%",
  padding: "0.75rem",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer"
};