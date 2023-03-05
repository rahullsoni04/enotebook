import React, { useState,useContext } from 'react'
import noteContext from "../contexts/notes/noteContext";
import alertContext from "../contexts/alertContext";


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    
    const AContext = useContext(alertContext);
    const { showAlert } = AContext;

    const [note, setNote] = useState({ tittle: "", description: "", tag: "" });

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      }
      
      const handleOnSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({tittle: "", description: "", tag: "" });
        showAlert("Note added successfully", "success");
    }

  return (
    <>
        <h2 className="my-4">Add Note</h2>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="tittle" className="form-label">
              Tittle
            </label>
            <input
              type="tittle"
              className="form-control"
              id="tittle"
              name="tittle"
              onChange={handleOnChange}
              value = {note.tittle}
              required
              />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleOnChange}
              value = {note.description}
              required
              />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleOnChange}
              value = {note.tag}
              required
              />
          </div>
          <button disabled = {note.tittle.length < 5 || note.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default AddNote