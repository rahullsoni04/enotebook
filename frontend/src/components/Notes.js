import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { note, readNote,updateNote } = context;

  const [enote, seteNote] = useState({tittle:"",description:"",tag:""});

  useEffect(() => {
    readNote();
    // eslint-disable-next-line
  }, [enote]);

  const ref = useRef(null);

  const editNote = (enote) => {
    seteNote(enote);
    ref.current.click();
  };
  
  const handleOnChange = (e) => {
    seteNote({ ...enote, [e.target.name]: e.target.value });
  };
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateNote(enote);
    ref.current.click();
  };

  return (
    <>
      {/* modal to edit the notes */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ display: "none" }}
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    value={enote.tittle}
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
                    value={enote.description}
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
                    value={enote.tag}
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled = {enote.tittle.length < 5 || enote.description.length < 5 }
                type="button"
                className="btn btn-primary"
                onClick={handleOnSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />

      <h2 className="my-5">Your Notes</h2>
      <div className="row my-3">
        {note.map((noteItem, index) => {
          return (
            <NoteItem key={index} note={noteItem} editNote={editNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
