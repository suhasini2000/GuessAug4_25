import { useState } from "react";
import axios from "axios";

export default function UpdateAnimal() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    try {
      await axios.put(
        "/api/animals/update-by-name/",
        { name, new_name: newName },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setMessage("Animal updated!");
    } catch {
      setMessage("Failed to update animal.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Update Animal by Name</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Current Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Name:
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      {message && <div style={{ color: "green" }}>{message}</div>}
    </div>
  );
}