import React,{useContext} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import noteContext from "../contexts/notes/noteContext";


const NoteItem = (props) => {
  const { note,editNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = (id) => {
    deleteNote(id);
    console.log(context)
  };

  return (
    <>
      <div className="col md-3 my-3">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{note.tittle}</Card.Title>
            <Card.Text>{note.description}</Card.Text>
            <div className="row">
              <div className="col ">
                <Button variant="primary" onClick={()=>editNote(note)}>
                  <i className="fa-solid fa-pen-to-square"></i> &nbsp; Edit
                </Button>
              </div>
              <div className="col ">
                <Button variant="primary" onClick={()=>handleDelete(note._id)}>
                  <i className="fa-solid fa-trash"></i> &nbsp; Delete
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default NoteItem;
