import "./App.css";

import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errors from "./Components/Errors/Errors";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";

const auth = getAuth();

//notifies when user signs in and out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // console.log(user.uid);
    console.log(user);
    // ...
  } else {
    console.log(" User is signed out");
  }
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav auth={auth} />
        <Routes>
          <Route path={"/"} element={<Home auth={auth} />} />
          <Route path={"*"} element={<Errors />} />
          <Route path={"/signin"} element={<SignIn auth={auth} />} />
          <Route path={"/signup"} element={<SignUp auth={auth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
