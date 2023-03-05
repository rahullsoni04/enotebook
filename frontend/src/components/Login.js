import React, { useState,useContext } from "react";
import {useNavigate} from "react-router-dom"; 
import alertContext from '../contexts/alertContext' 

const Login = () => {
  //Using alert component to log the output of login
  const AContext = useContext(alertContext);
  const { showAlert } = AContext;

  const [credentials,setCredentials] = useState({ email: "", password: "" });
  const history = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const host = "http://localhost:5000"

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const res = await response.json();
      if(res.success){
        localStorage.setItem("token", res.authToken);
        history("/");
        showAlert("Login Successful", "success");        
      }else{
        showAlert("Invalid Credentials", "danger");
      }
  }


  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3 my-4">
        <h2 className="text-center">Login</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={handleOnChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={handleOnChange}
            autoComplete="true"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
