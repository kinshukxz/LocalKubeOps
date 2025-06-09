const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/devopsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NoteSchema = new mongoose.Schema({ text: String });
const Note = mongoose.model("Note", NoteSchema);

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.status(201).json(newNote);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
