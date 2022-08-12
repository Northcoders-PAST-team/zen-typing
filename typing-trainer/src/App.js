import "./App.css";
import { db } from "./firebaseConfig";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Components/User/User";
import Errors from "./Components/Errors/Errors";
import { serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";

const auth = getAuth();

//notifies when user signs in and out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    const usersRef = doc(db, "users", user.uid);

    getDoc(usersRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return;
      } else {
        // create the document
        setDoc(usersRef, {
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
    });
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
          <Route path={"/users/:username"} element={<User auth={auth} />} />
          <Route path={"*"} element={<Errors />} />
          <Route path={"/signin"} element={<SignIn auth={auth} />} />
          <Route path={"/signup"} element={<SignUp auth={auth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
