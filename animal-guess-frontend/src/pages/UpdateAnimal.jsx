import React, { useState, useEffect } from "react";

export default function UpdateAnimal({ animalId }) {
  const [animal, setAnimal] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/animals/${animalId}/`)
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setName(data.name);
        setDescription(data.description || "");
      });
  }, [animalId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    fetch(`/api/animals/${animalId}/update/`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => setMessage("Animal updated successfully!"))
      .catch(() => setMessage("Error updating animal."));
  };

  if (!animal) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Animal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
