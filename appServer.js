const express = require("express");
const notes = require("./notes.json");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/notes", (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const note = notes.filter(note => note.noteId === parseInt(req.params.id, 10));
    console.log(note);
    if(note.length === 0) res.status(404).send("Note not found!")
    else{
        res.set('Content-Type', 'application/json');
        res.status(200).send(note);
    }
});

app.post("/api/notes", (req, res) => {
    const note = req.body;
    note.noteId = Math.random() * 3456543;
    notes.push(note);
    res.set('Content-Type', 'application/json');
    res.status(201).send(note);
});


app.listen(port, () => {
    console.log("app started on ", port);
});