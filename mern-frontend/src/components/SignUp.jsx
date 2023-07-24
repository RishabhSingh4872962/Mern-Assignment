import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ setUser }) {
  // State for form data and errors
  const [userdata, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    number: null,
    gender: null,
    age: null,
    password: "",
    street: "",
    city: "",
    pincode: "",
    country: "",
  });
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    number: "",
    gender: "",
    age: "",
    password: "",
    street: "",
    city: "",
    pincode: "",
    country: "",
  });

  const navigate = useNavigate();

  function userCredensials(e) {
    const { name, value } = e.target;
    setUserData({
      ...userdata,
      [name]: value,
    });
    validateField(name, value);
  }

  function validateField(fieldName, value) {
    let error = "";
    switch (fieldName) {
      case "firstName":
      case "lastName":
        error =
          value.length < 3 || value.length > 8
            ? "Name should be between 3 and 8 characters"
            : "";
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
        break;
      case "countryCode":
        error = value.length === 0 ? "Country code must be provided" : "";
        break;
      case "number":
        error =
          value.toString().length !== 6
            ? "Phone number length should be equal to 6"
            : "";
        break;
      case "gender":
        error = !["male", "female", "trans", "not to disclose"].includes(value)
          ? "Invalid gender"
          : "";
        break;
      case "age":
        error =
          value < 10 || value > 80 ? "Age should be between 10 and 80" : "";
        break;
      case "password":
        error =
          value.length < 6 || value.length > 15
            ? "Password should be between 6 and 15 characters"
            : "";
        break;
      case "street":
        error = value.length === 0 ? "Street address must be provided" : "";
        break;
      case "city":
        error = value.length === 0 ? "City must be provided" : "";
        break;
      case "pincode":
        error = value.length === 0 ? "Pincode must be provided" : "";
        break;
      case "country":
        error = value.length === 0 ? "Country must be provided" : "";
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [fieldName]: error,
    });
  }

  async function submitUser() {
    // Check if there are any errors in the form
    const formValid = Object.values(errors).every((error) => error === "");
    if (!formValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/auth/users",
        {
          firstName: userdata.firstName,
          lastName: userdata.lastName,
          email: userdata.email,
          phone: {
            countryCode: userdata.countryCode,
            number: userdata.number,
          },
          gender: userdata.gender,
          age: userdata.age,
          password: userdata.password,
          address: {
            street: userdata.street,
            city: userdata.city,
            pincode: userdata.pincode,
            country: userdata.country,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", data.token);
      navigate("/");
      setUser(true);
    } catch ({ response }) {
      console.log(response.data);
      alert("An error occurred during registration. Please try again later.");
    }
  }
  return (
    <div className="container mt-5">
      <h2>User Registration</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            onChange={userCredensials}
            name="firstName"
            value={userdata.firstName}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={userCredensials}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={userCredensials}
            placeholder="Enter email"
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="countryCode">Country Code:</label>
            <input
              type="text"
              className="form-control"
              id="countryCode"
              name="countryCode"
              onChange={userCredensials}
              placeholder="Country code"
            />
          </div>
          <div className="form-group col-md-9">
            <label htmlFor="number">Phone Number:</label>
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              onChange={userCredensials}
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              onChange={userCredensials}
              value="male"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              onChange={userCredensials}
              value="female"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="trans"
              onChange={userCredensials}
              value="trans"
            />
            <label className="form-check-label" htmlFor="trans">
              Trans
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="notToDisclose"
              onChange={userCredensials}
              value="not to disclose"
            />
            <label className="form-check-label" htmlFor="notToDisclose">
              Not to disclose
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            onChange={userCredensials}
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={userCredensials}
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            onChange={userCredensials}
            placeholder="Enter street address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={userCredensials}
            placeholder="Enter city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            onChange={userCredensials}
            name="pincode"
            placeholder="Enter pincode"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            className="form-control"
            id="country"
            onChange={userCredensials}
            name="country"
            placeholder="Enter country"
          />
        </div>
      </form>

      <button className="btn btn-primary" onClick={submitUser}>
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
