import React from "react";
import { Link ,useNavigate} from "react-router-dom";

function Appbar({ user ,setUser}) {
  const navigate=useNavigate()
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Home
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         {user && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/users"}
              >
                users
              </Link>
            </li>
          </ul>}

          {!user ? (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              {" "}
              <Link to={"/login"} className="btn btn-secondary">
                Login
              </Link>
              <Link to={"/signup"} className="btn btn-secondary">
                SignUp
              </Link>
            </div>
          ) : (
            <button type="button" className="btn btn-danger" onClick={()=>{
              setUser(false)
              navigate('/')
              localStorage.removeItem("token")
            }}>
              logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Appbar;
