const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/devopsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Note schema with timestamps
const NoteSchema = new mongoose.Schema(
  {
    text: String,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add a new note
app.post("/notes", async (req, res) => {
  try {
    const newNote = new Note({ text: req.body.text });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to add note" });
  }
});

// Update a note
app.put("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
