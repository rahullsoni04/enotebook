import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function NavBar() {
  let location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            e-Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
             
            </ul>
            {!localStorage.getItem('token') ? <div className="ms-auto">
              <Link type="button" className="btn btn-primary mx-2" to="/login">Login</Link>
              <Link type="button" className="btn btn-primary mx-2" to="/signup">Sign up</Link>
            </div>:
            <div className="ms-auto">
              <Link type="button" className="btn btn-primary mx-2" to="/login" onClick={()=>localStorage.removeItem('token')}>Logout</Link>
            </div>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
