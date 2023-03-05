import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notes = [];

  const [note, setNote] = useState(notes);

  //  Adds the new note into the database
  const addNote = async (newNote) => {
    const n = {
      tittle: newNote.tittle,
      description: newNote.description,
      tag: newNote.tag,
    };
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(n),
    });
    await response.json();
    setNote(note.concat(n));
  };

  // Fetch data from the database
  const readNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    let res = await response.json();
    setNote(res);
  };

  // Update the note in the database
  const updateNote = async (enote) => {
    let {_id} = enote
    const response = await fetch(`${host}/api/notes/updateNotes/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(enote),
    });
    await response.json();
    readNote()
  };

  // Delete the note from the database
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    await response.json();

    const newNote = note.filter((noteItem) => {
      return noteItem._id !== id;
    });
    setNote(newNote);
  };

  return (
    <NoteContext.Provider value={{ note, addNote, readNote , updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
