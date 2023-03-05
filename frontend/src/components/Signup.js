import React, { useState,useContext } from "react";
import {useNavigate} from "react-router-dom"; 
import alertContext from '../contexts/alertContext' 

const Signup = () => {

  const AContext = useContext(alertContext);
  const { showAlert } = AContext;

  const [credentials,setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" });

  const history = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };
  const host = "http://localhost:5000"
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.cpassword){
      showAlert("Password and Confirm Password must be same","danger");
      return;
    }
    console.log(credentials)
    const response = await fetch(`${host}/api/auth/signup`, {
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
        showAlert("Account Created Successfully", "success");        

      }else{
        showAlert(res.error, "danger");
      }
  }


  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3 my-4">
        <h2 className="text-center">Sign up</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name" 
            placeholder="Enter your name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={handleOnChange}
            minLength={3}
          />
        </div>
        <div className="mb-3 my-4">
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={credentials.cpassword}
            onChange={handleOnChange}
            autoComplete="true"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
