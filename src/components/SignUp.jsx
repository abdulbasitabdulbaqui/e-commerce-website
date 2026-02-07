import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [createPassWord, setCreatePassWord] = useState("");
  const [createPassWordError, setCreatePassWordError] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState({
    username:null,
    
  });

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCreatePassword = (e) => {
    setCreatePassWord(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      number.length === 0 ||
      email.length === 0 ||
      createPassWord.length === 0 ||
      confirmPassword.length === 0
    ) {
      setFormError("All Fields Are Required");
      return;
    } else {
      setFormError("");
    }

    if (name.length < 3) {
      setNameError("Min charachter of name should be 3");
      return;
    } else if (name.length > 15) {
      setNameError("Max charachter of name should be 15");
    } else {
      setNameError("");
    }

    if (number.length < 10) {
      setNumberError("Min charachter of number should be 10");
      return;
    } else if (number.length > 10) {
      setNumberError("Max charachter of number should be 10");
    }

    if (email.length < 3) {
      setEmailError("Min charachter of email should be 3");
      return;
    } else {
      setEmailError("");
    }

    if (createPassWord.length < 7) {
      setCreatePassWordError("Min charachter of PassWord should be 7");
      return;
    } else {
      setCreatePassWordError("");
    }

    if (confirmPassword.length < 7) {
      setConfirmPasswordError("Min charachter of confirmPassword should be 7");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (createPassWord !== confirmPassword) {
      return setConfirmPasswordError("passwords not matched");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          username: name,
          mobileNumber: number,
          email,
          password: createPassWord,
          confirmPassword,
        },
      );
      alert("Registration sucessfully Done");
    } catch (error) {
      console.log(error.response?.data?.message || "Registration failed");
    }
    setName("");
    setNumber("");
    setEmail("");
    setCreatePassWord("");
    setconfirmPassword("");
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{ height: "700px", width: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="d-flex justify-content-center col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4 shadow p-3 mb-5 bg-white rounded shadow-lg ">
          <div className="w-100" style={{ marginTop: "30px" }}>
            <div style={{ textAlign: "center" }}>
              <h1>Sign-Up Form</h1>
            </div>
            <label>Username:</label>
            <input
              name="username"
              style={{ padding: "10px", width: "90%" }}
              type="text"
              placeholder="Enter Your Name"
              onChange={handleName}
              value={name}
              className="form-control mb-1 w-100"
            />

            {nameError && <p className="text-danger small">{nameError}</p>}

            <label>Mobile Number:</label>
            <input
              style={{ padding: "10px", width: "90%" }}
              type="text"
              placeholder="Enter Your Number"
              onChange={handleNumber}
              value={number}
              className="form-control mb-1 w-100"
            />
            {numberError && (
              <p className="text-danger small mb-3">{numberError}</p>
            )}

            <label>E-mail:</label>
            <input
              style={{ padding: "10px", width: "90%" }}
              type="email"
              placeholder="Enter Your E-mail"
              onChange={handleEmail}
              value={email}
              className="form-control mb-1 w-100"
            />

            {emailError && (
              <p className="text-danger small mb-3">{emailError}</p>
            )}

            <label>Password:</label>
            <input
              style={{ padding: "10px", width: "90%" }}
              type="password"
              placeholder="Enter Your Password"
              onChange={handleCreatePassword}
              value={createPassWord}
              className="form-control mb-1 w-100"
            />

            {createPassWordError && (
              <p className="text-danger small mb-3">{createPassWordError}</p>
            )}

            <label>Confirm Password:</label>
            <input
              style={{ padding: "10px", width: "90%" }}
              type="password"
              placeholder="Enter Your Confirm Password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              className="form-control mb-1 w-100"
            />

            {confirmPasswordError && (
              <p className="text-danger small mb-3">{confirmPasswordError}</p>
            )}

            <div>
              <button type="submit" className="btn btn-primary w-100 mt-0">
                SUBMIT
              </button>
            </div>
            <div className="text-center mt-2">
              <Button onClick={handleLogin} variant="link">
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
