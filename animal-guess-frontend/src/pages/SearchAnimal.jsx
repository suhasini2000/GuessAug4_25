import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchAnimal() {
  const [searchName, setSearchName] = useState("");
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); setAnimal(null);

    if (!accessToken) {
      setError("You are not logged in. Please log in as admin.");
      return;
    }
    try {
      const res = await axios.get(`/api/animals/search/?name=${searchName}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (Array.isArray(res.data) && res.data.length > 0) {
        setAnimal(res.data[0]);
      } else {
        setError("Animal not found.");
      }
    } catch {
      setError("Error searching for animal.");
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
        minWidth: "340px"
      }}>
        <button
          onClick={() => navigate("/admin-dashboard")}
          style={{
            marginBottom: "1rem",
            background: "#64748b",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Back to Dashboard
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#2563eb" }}>
          Search Animal
        </h2>
        <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Enter animal name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            required
            style={{
              width: "70%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              marginRight: "0.5rem"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </form>
        {error && <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
        {animal && (
          <div style={{
            background: "#f1f5f9",
            borderRadius: "8px",
            padding: "1rem",
            marginTop: "1rem"
          }}>
            <div><strong>Name:</strong> {animal.name}</div>
            <div style={{ margin: "0.5rem 0" }}>
              <strong>Image:</strong>{" "}
              {animal.image && (
                <img src={animal.image} alt={animal.name} width={100} style={{ borderRadius: 8 }} />
              )}
            </div>
            <div><strong>Uploaded At:</strong> {animal.uploaded_at}</div>
          </div>
        )}
      </div>
    </div>
  );
}