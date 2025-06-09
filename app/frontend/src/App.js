import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const api = "http://127.0.0.1:30081/notes";

  useEffect(() => {
    axios
      .get(api)
      .then((res) => setNotes(res.data))
      .catch(() => setError("Unable to fetch notes from backend"));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleAddOrUpdate = async () => {
    if (!input.trim()) return;

    try {
      if (editId) {
        await axios.put(`${api}/${editId}`, { text: input });
        const updatedNotes = notes.map((note) =>
          note._id === editId ? { ...note, text: input } : note
        );
        setNotes(updatedNotes);
        setEditId(null);
      } else {
        const res = await axios.post(api, { text: input });
        setNotes([...notes, res.data]);
      }
      setInput("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete note.");
    }
  };

  const handleEdit = (note) => {
    setInput(note.text);
    setEditId(note._id);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(to right, #141e30, #243b55)"
          : "linear-gradient(to right, #dce35b, #45b649)",
        color: darkMode ? "#f5f5f5" : "#1f1f1f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
        transition: "all 0.4s ease-in-out",
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: darkMode ? "#f0f0f0" : "#222",
          color: darkMode ? "#222" : "#fff",
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 style={{ marginBottom: "1rem" }}>📝 LocalKubeOps Notes</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note"
          style={{
            padding: "0.5rem",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddOrUpdate}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              background: darkMode ? "#2c3e50" : "#fff",
              color: darkMode ? "#ecf0f1" : "#333",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              wordBreak: "break-word",
              transition: "0.3s ease",
              position: "relative",
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>{note.text}</div>
            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              {new Date(note.createdAt || note.updatedAt || Date.now()).toLocaleString()}
            </div>
            <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleEdit(note)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                ✏️
              </button>
              <button onClick={() => handleDelete(note._id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
