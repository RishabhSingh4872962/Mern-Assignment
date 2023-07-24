import React from "react";

function DashBoard({ user }) {
  return (
    <div>
      {user ? (
        <>
          <p>user login succesfully</p>
        </>
      ) : (
        "please login or register"
      )}
    </div>
  );
}

export default DashBoard;
