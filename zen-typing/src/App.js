import "./App.scss";
import { db } from "./firebaseConfig";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Components/User/User";
import Errors from "./Components/Errors/Errors";
import Users from "./Components/AllUsers/Users";

import {
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import About from "./Components/About/About";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { UserContext } from "./Components/User/UserContext";

import { useAuthState } from "react-firebase-hooks/auth";
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const usersRef = doc(db, "users", user.uid);
    console.log(" User is signed in");
    getDoc(usersRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        updateDoc(usersRef, {
          online: true,
        });
      } else {
        setDoc(usersRef, {
          email: user.email,
          displayName: user.displayName || user.email,
          createdAt: serverTimestamp(),
          friends: [],
          online: true,
          avatar: user.photoURL,
          id: user.uid,
        });
      }
    });
  } else {
    console.log(" User is signed out");
  }
});

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <div className="background-overlay">
        <BrowserRouter>
          <UserContext.Provider value={{ user, auth }}>
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"about"} element={<About />} />
              <Route path={"/users/:user_id"} element={<User />} />
              <Route path={"/users"} element={<Users />} />
              <Route path={"*"} element={<Errors />} />
              <Route path={"/signin"} element={<SignIn />} />
              <Route path={"/signup"} element={<SignUp />} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
