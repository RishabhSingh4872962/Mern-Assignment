import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Users({ setUser }) {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();
  const [totalPage, settotalPage] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  const handleAscendingChange = () => {
   
      setIsAscending(!isAscending);
      setusers( users.sort((a, b) => {
        return b.firstName.localeCompare(a.firstName);
    }))
    
   
  };
  const handleDescendingChange = () => {
  
    setIsDescending(!isDescending);
    setusers( users.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
  }))
  
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const apiUrl = `http://localhost:5000/user/auth/users?page=${pageNo}`;
        const token = localStorage.getItem("token"); // Replace 'yourTokenHere' with the actual token value
        axios
          .get(apiUrl, {
            headers: {
              token: `${token}`, // Set the token as a cookie in the "Cookie" header
            },
          })
          .then((response) => {
            // Handle the response here
            setusers(response.data.user);
            settotalPage(Math.ceil(response.data.dataLength / 5));
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error("Error:", error.message);
          });
        setUser(true);
      } catch (error) {
        console.log(error);
        navigate("/");
        setUser(true);
      }
    } else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [pageNo]);

  function paginationBack() {
    setPageNo(pageNo - 1);
  }

  function paginationForward() {
    setPageNo(pageNo + 1);
  }

  return (
    <>
      <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="ascendingSwitch"
        checked={isAscending}
        onChange={handleAscendingChange}
      />
      <label className="form-check-label" htmlFor="ascendingSwitch">
      Descending
      </label><br/>
      <input
        className="form-check-input"
        type="checkbox"
        id="descendingSwitch"
        checked={isDescending}
        onChange={handleDescendingChange}
      />
      <label className="form-check-label" htmlFor="descendingSwitch">
        
        Ascending
      </label>
    </div>
      {users.map((user) => {
        return <UserShow user={user} setusers={setusers} key={user._id} />;
      })}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-outline-info"
              onClick={paginationBack}
              disabled={pageNo < 2}
            >
              Previous Page
            </button>
          </li>
          <li className="page-item">
            <button
              className="btn btn-outline-dark"
              onClick={paginationForward}
              disabled={pageNo >= totalPage}
            >
              Next Page
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

function UserShow({ user, setusers }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = "http://localhost:5000/user/auth/users";
      if (token) {
        await axios.delete(
          `http://localhost:5000/user/auth/deluser/${user._id}`,
          {
            headers: {
              token: `${token}`,
            },
          }
        );
        const { data } = await axios.get(apiUrl, {
          headers: {
            token: `${token}`, // Set the token as a cookie in the "Cookie" header
          },
        });
        setusers(data.user);
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">User Information</h3>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>First Name:</strong> {user.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {user.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Address</h5>
                  <p>
                    <strong>Street:</strong> {user.address.street}
                  </p>
                  <p>
                    <strong>City:</strong> {user.address.city}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {user.address.pincode}
                  </p>
                  <p>
                    <strong>Country:</strong> {user.address.country}
                  </p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Phone</h5>
                  <p>
                    <strong>Country Code:</strong> {user.phone.countryCode}
                  </p>
                  <p>
                    <strong>Number:</strong> {user.phone.number}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-danger mr-2" onClick={handleDelete}>
                  Delete
                </button>
                <Link className="btn btn-primary" to={`/user/${user._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Users;
