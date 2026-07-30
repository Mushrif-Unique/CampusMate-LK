import express from "express";

const router = express.Router();

const notes = [
  { id: 1, title: "Software Engineering" },
  { id: 2, title: "Database Systems" }
];

router.get("/", (req, res) => {
  res.json(notes);
});

router.post("/", (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

router.put("/:id", (req, res) => {

  const id = Number(req.params.id);

  const note = notes.find(note => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  note.title = req.body.title;

  res.json(note);

});

router.delete("/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = notes.findIndex(
    note => note.id === id
  );

  if(index === -1){
    return res.status(404).json({
      message:"Note not found"
    });
  }

  notes.splice(index,1);

  res.json({
    message:"Note deleted successfully"
  });

});

export default router;