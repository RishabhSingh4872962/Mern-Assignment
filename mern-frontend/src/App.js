import { Route, Routes, BrowserRouter } from "react-router-dom";
import Appbar from "./components/Appbar";
import DashBoard from "./components/DashBoard";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import Edituser from "./components/EditUser";

function App() {
  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>
      <Appbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<DashBoard user={user} />} />
        <Route
          path="/login"
          element={<SignIn user={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route path="/users" element={<Users setUser={setUser} />} />
        <Route path="/user/:id" element={<Edituser setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
