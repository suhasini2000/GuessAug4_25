import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAnimal() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    const accessToken = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/animals/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("Animal added!");
      setName("");
      setImage(null);
    } catch {
      setError("Failed to add animal.");
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
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          minWidth: "320px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2563eb" }}>
          Add Animal
        </h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
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
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
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
        {message && (
          <div style={{ color: "green", marginBottom: "1rem", textAlign: "center" }}>
            {message}
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
          Add
        </button>
        <button
          type="button"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#64748b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "1rem"
          }}
          onClick={() => navigate("/admin-dashboard")}
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}