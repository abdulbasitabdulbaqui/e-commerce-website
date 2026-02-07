import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (name.length < 3) {
      setNameError("Min charachter of name should be 3");
      return;
    } else if (name.length > 15) {
      setNameError("Max charachter of name should be 15");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password.length < 3) {
      setPasswordError("Min charachter of password should be 3");
      return;
    } else if (password.length > 10) {
      setPasswordError("Max charachter of password should be 10");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username: name,
          password,
        },
      );
      alert("Login sucessfully");
      setError("");
      setName("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div
      style={{ height: "600px", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-center col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4 shadow p-3  bg-white rounded shadow-lg ">
        <div className="w-100" style={{ marginTop: "60px" }}>
          <div style={{ textAlign: "center" }}>
            <h1>LOGIN FORM</h1>
          </div>
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <label>User Name:</label>
          <input
            style={{ padding: "10px", width: "90%" }}
            type="text"
            placeholder="Enter Your Name"
            onChange={handleName}
            value={name}
            className="form-control mb-1 w-100"
          />

          {nameError && (
            <div className="text-danger small mb-3">{nameError}</div>
          )}

          <label>Password:</label>
          <input
            style={{ padding: "10px", width: "90%" }}
            type="password"
            placeholder="Enter Your Password"
            onChange={handlePassword}
            value={password}
            className="form-control mb-1 w-100"
          />

          {passwordError && (
            <div className="text-danger small mb-3">{passwordError}</div>
          )}

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-0"
            >
              SUBMIT
            </button>
          </div>
          <div className="text-center mt-2">
            <p>If you don't have Account</p>
            <Button onClick={handleSignUp} variant="link">
              signup
            </Button>
          </div>

          <div className="text-center mt-2">
           
             
              <Button onClick={handleHome} variant="link">
                Back to Home
              </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
