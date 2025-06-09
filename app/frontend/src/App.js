import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://backend:5000/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;
    axios.post("http://backend:5000/notes", { text: input })
      .then(res => {
        setNotes([...notes, res.data]);
        setInput("");
      })
      .catch(err => console.error("Error adding note:", err));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📝 LocalKubeOps Notes App</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note"
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "0.5rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note._id} style={{ marginBottom: "0.5rem" }}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
