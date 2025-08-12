import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send the form data to your backend
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Us</h1>
      {submitted ? (
        <p>Thank you for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </div>
          <button type="submit">Send</button>
        </form>
        )
        }   
        </div>
        );
        }
        