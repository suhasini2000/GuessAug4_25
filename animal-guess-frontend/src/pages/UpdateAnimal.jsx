import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateAnimal() {
  const [searchName, setSearchName] = useState("");
  const [animal, setAnimal] = useState(null);
  const [originalName, setOriginalName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setAnimal(null);

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
        setOriginalName(res.data[0].name);
      } else {
        setAnimal(null);
        setError("Animal not found.");
      }
    } catch (err) {
      setAnimal(null);
      if (err.response && err.response.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
      } else {
        setError("Error searching for animal.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    const formData = new FormData();
    formData.append("name", originalName);
    formData.append("new_name", animal.name);
    if (animal.image instanceof File) {
      formData.append("image", animal.image);
    }
    try {
      await axios.put(
        `/api/animals/update-by-name/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessage("Animal updated!");
      setOriginalName(animal.name);
    } catch {
      setError("Failed to update animal.");
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
          Update Animal
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
            Find & Update
          </button>
        </form>
        {error && <div style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
        {animal && (
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: "1rem" }}>
              <label>Name:</label>
              <input
                type="text"
                value={animal.name}
                onChange={e => setAnimal({ ...animal, name: e.target.value })}
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
              <label>Image URL:</label>
              <input
                type="text"
                value={typeof animal.image === "string" ? animal.image : ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1"
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Uploaded At:</label>
              <input
                type="text"
                value={animal.uploaded_at || ""}
                readOnly
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1"
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setAnimal({ ...animal, image: e.target.files[0] })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1"
                }}
              />
            </div>
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
              Update
            </button>
            {message && <div style={{ color: "green", marginTop: "1rem", textAlign: "center" }}>{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
}