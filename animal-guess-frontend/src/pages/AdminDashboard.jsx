import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function AdminDashboard() {
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  

  const handleUpdateByName = async (e) => {
    e.preventDefault();
    setError("");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setError("You are not logged in. Please log in as admin.");
      return;
    }

    try {
      const res = await axios.get(`/api/animals/search/?name=${searchName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        navigate(`/update-animal/${res.data[0].id}`);
      } else {
        setError("Animal not found.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
      } else {
        setError("Error searching for animal.");
      }
      console.error("Search error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/add-animal">Add Animal</Link>
        </li>
        <li>
          <Link to="/list-animals">List Animals</Link>
        </li>
        <li>
          <Link to="/search-animal">Search Animal</Link>
        </li>
        <li>
        <Link to="/update-animal">Update Animal</Link>
        </li>
      </ul>

      
    </div>
  );
}