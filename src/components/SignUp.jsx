import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    username: null,
    mobileNumber: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.mobileNumber || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError({
        ...formError,
        username: !formData.username ? "Username is required" : "",
        mobileNumber: !formData.mobileNumber ? "Mobile Number is required" : "",
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
        confirmPassword: !formData.confirmPassword ? "Confirm Password is required" : "",
      });
      return;
    }

    if (formData.username.length < 3) {
      setFormError({ ...formError, username: "Min character of name should be 3" });
      return;
    } else if (formData.username.length > 15) {
      setFormError({ ...formError, username: "Max character of name should be 15" });
    } else {
      setFormError({ ...formError, username: "" });
    }

    if (formData.mobileNumber.length < 10) {
      setNumberError("Min character of number should be 10");
      return;
    } else if (formData.mobileNumber.length > 10) {
      setNumberError("Max character of number should be 10");
    }

    if (formData.email.length < 3) {
      setEmailError("Min character of email should be 3");
      return;
    } else {
      setEmailError("");
    }

    if (formData.password.length < 7) {
      setCreatePassWordError("Min character of PassWord should be 7");
      return;
    } else {
      setCreatePassWordError("");
    }

    if (formData.confirmPassword.length < 7) {
      setConfirmPasswordError("Min character of confirmPassword should be 7");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (formData.password !== formData.confirmPassword) {
      return setConfirmPasswordError("passwords not matched");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          username: formData.username,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      );
      alert("Registration successfully Done");
      setFormData({});
    } catch (error) {
      console.log(error.response?.data?.message || "Registration failed");
    }
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
          <div className="w-100 mt-5">
            <div style={{ textAlign: "center" }}>
              <h1>Sign-Up Form</h1>
            </div>
            <label className={`${formError?.username ? "text-danger" : ""}`}>Username:</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className={`form-control mb-1 w-100 ${formError?.username ? "is-invalid" : ""}`}
              style={{ padding: "10px", width: "90%" }}
              value={formData.username}
              onChange={handleChange}
            />

            {formError?.username && <p className="text-danger small">{formError?.username}</p>}

            <label className={`${formError?.mobileNumber ? "text-danger" : ""}`}>Mobile Number:</label>
            <input
              name="mobileNumber"
              style={{ padding: "10px", width: "90%" }}
              type="text"
              placeholder="Enter Your Number"
              onChange={handleChange}
              value={formData.mobileNumber}
              className={`form-control mb-1 w-100 ${formError?.mobileNumber ? "is-invalid" : ""}`}
            />
            {formError?.mobileNumber && <p className="text-danger small">{formError?.mobileNumber}</p>}

            <label className={`${formError?.email ? "text-danger" : ""}`}>E-mail:</label>
            <input
              name="email"
              style={{ padding: "10px", width: "90%" }}
              type="email"
              placeholder="Enter Your E-mail"
              onChange={handleChange}
              value={formData.email}
              className={`form-control mb-1 w-100 ${formError?.email ? "is-invalid" : ""}`}
            />

            {formError?.email && <p className="text-danger small">{formError?.email}</p>}

            <label className={`${formError?.password ? "text-danger" : ""}`}>Password:</label>
            <input
              name="password"
              style={{ padding: "10px", width: "90%" }}
              type="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={formData.password}
              className={`form-control mb-1 w-100 ${formError?.password ? "is-invalid" : ""}`}
            />

            {formError?.password && <p className="text-danger small">{formError?.password}</p>}

            <label className={`${formError?.confirmPassword ? "text-danger" : ""}`}>Confirm Password:</label>
            <input
              name="confirmPassword"
              style={{ padding: "10px", width: "90%" }}
              type="password"
              placeholder="Enter Your Confirm Password"
              onChange={handleChange}
              value={formData.confirmPassword}
              className={`form-control mb-1 w-100 ${formError?.confirmPassword ? "is-invalid" : ""}`}
            />

            {formError?.confirmPassword && <p className="text-danger small">{formError?.confirmPassword}</p>}

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
