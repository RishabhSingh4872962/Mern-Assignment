import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edituser({ setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    number: "",
    gender: "",
    age: "",
    street: "",
    city: "",
    pincode: "",
    country: "",
  });
  function userCredensials(e) {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  }

  React.useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`http://localhost:5000/user/auth/user/${id}`, {
            headers: {
              token: `${token}`, // Set the token as a cookie in the "Cookie" header
            },
          })
          .then(({ data }) => {
            setUserData({
              ...data.user,
              countryCode: data.user.phone.countryCode,
              number: data.user.phone.number,
              street: data.user.address.street,
              city: data.user.address.city,
              pincode: data.user.address.pincode,
              country: data.user.address.country,
            });
            setUser(true);
          })
          .catch((err) => {
            navigate("/users");
          });
      } else {
        navigate("/users");
      }
    } catch (error) {
      navigate("/users");
    }
    // eslint-disable-next-line
  }, []);
  async function saveUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(
          `http://localhost:5000/user/auth/update/${id}`,
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
              token: `${token}`, // Set the token as a cookie in the "Cookie" header
            },
          }
        );
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
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
            value={userdata.lastName}
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
            value={userdata.email}
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
              value={userdata.countryCode}
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
              value={userdata.number}
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
              checked={userdata.gender === "male"}
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
              checked={userdata.gender === "female"}
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
              checked={userdata.gender === "trans"}
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
              checked={userdata.gender === "not to disclose"}
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
            value={userdata.age}
            onChange={userCredensials}
            placeholder="Enter age"
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
            value={userdata.street}
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
            value={userdata.city}
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
            value={userdata.pincode}
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
            value={userdata.country}
            name="country"
            placeholder="Enter country"
          />
        </div>
      </form>

      <button className="btn btn-primary" onClick={saveUser}>
        Save Changes
      </button>
    </div>
  );
}

export default Edituser;
