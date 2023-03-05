import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import NoteState from "./contexts/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import AlertState from "./contexts/AlertState";

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
