import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this line

import axios from "axios";

// ...existing imports...
export default function ListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAnimals = () => {
    const accessToken = localStorage.getItem("access_token");
    axios.get("/api/animals/", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => setAnimals(res.data))
      .catch(() => setError("Failed to load animals."));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleDelete = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    if (window.confirm("Are you sure you want to delete this animal?")) {
      try {
        await axios.delete(`/api/animals/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setAnimals(animals.filter(animal => animal.id !== id));
      } catch {
        setError("Failed to delete animal.");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Animals</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Uploaded At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.name}</td>
              <td>
                {animal.image && (
                  <img src={animal.image} alt={animal.name} width={80} />
                )}
              </td>
              <td>{animal.uploaded_at}</td>
              <td>
                <button onClick={() => handleDelete(animal.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/admin-dashboard")}>
        Go to Admin Dashboard
      </button>
    </div>
  );
}