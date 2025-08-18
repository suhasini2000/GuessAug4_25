import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {
      setError("Error searching for animal.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Search Animal</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter animal name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {animal && (
        <div style={{ marginTop: "1rem" }}>
          <div><strong>Name:</strong> {animal.name}</div>
          <div>
            <strong>Image:</strong>{" "}
            {animal.image && <img src={animal.image} alt={animal.name} width={100} />}
          </div>
          <div><strong>Uploaded At:</strong> {animal.uploaded_at}</div>
        </div>
      )}

       <button onClick={() => navigate("/admin-dashboard")}>
        Go to Admin Dashboard
      </button>

    </div>
  );
}