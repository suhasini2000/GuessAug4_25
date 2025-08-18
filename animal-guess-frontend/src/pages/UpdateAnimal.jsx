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
    <div style={{ padding: "2rem" }}>
      
      <h1>Update Animal</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter animal name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          required
        />
        <button type="submit">Find & Update</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {animal && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={animal.name}
              onChange={e => setAnimal({ ...animal, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={animal.image || ""}
              readOnly
            />
          </div>
          <div>
            <label>Uploaded At:</label>
            <input
              type="text"
              value={animal.uploaded_at || ""}
              readOnly
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setAnimal({ ...animal, image: e.target.files[0] })}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      )}

      <button onClick={() => navigate("/admin-dashboard")}>
        Go to Admin Dashboard
      </button>
      {message && <div style={{ color: "green" }}>{message}</div>}
    </div>
  );
}