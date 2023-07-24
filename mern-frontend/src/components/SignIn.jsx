import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { email, password } = credentials;

  function handleChange(e) {
    const { name, value } = e.target;

    // Validate the email and password inputs
    if (name === "email") {
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    } else if (name === "password") {
      if (value.length < 6 || value.length > 18) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be between 6 and 18 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  async function loginUser() {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
      setUser(true);
    } catch (error) {
      // Handle login error here
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage(
          "An error occurred during login. Please try again later."
        );
      }
      setCredentials({
        email: "",
        password: "",
      });
    }
  }

  const isButtonDisabled = Object.values(errors).some((error) => error !== "");

  return (
    <>
      <p className="h1">Login Page</p>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="floatingInputInvalid"
          name="email"
          onChange={handleChange}
          placeholder="name@example.com"
          value={email}
        />
        <label htmlFor="floatingInput">Email address</label>
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-floating">
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="floatingPassword"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          value={password}
        />
        <label htmlFor="floatingPassword">Password</label>
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}

        <div className="mb-2 col">
          <button
            className="btn btn-primary mb-3"
            onClick={loginUser}
            disabled={
              isButtonDisabled ||
              credentials.email === "" ||
              credentials.password === ""
            }
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
