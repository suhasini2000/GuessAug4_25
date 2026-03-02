import { useState } from "react";

export default function AddAnimal() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData is needed for file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/animals/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // if using JWT
        },
        body: formData
      });

      if (res.ok) {
        setMessage("Animal added successfully!");
        setName("");
        setImage(null);
        setDescription("");
      } else {
        const errData = await res.json();
        setMessage("Error: " + JSON.stringify(errData));
      }
    } catch (error) {
      setMessage("Request failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add Animal</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Animal Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Add Animal</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
