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
import { UserContext } from "./Components/User/UserContext";

import { useAuthState } from "react-firebase-hooks/auth";
const auth = getAuth();

//notifies when user signs in and out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    const usersRef = doc(db, "users", user.uid);
    console.log(user.photoURL);
    getDoc(usersRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        return;
      } else {
        // create the document
        setDoc(usersRef, {
          email: user.email,
          userName: user.email,
          createdAt: serverTimestamp(),
          friends: [],
          online: true,
          avatar: user.photoURL,
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
      <BrowserRouter>
        <UserContext.Provider value={{ user, auth }}>
          <Nav />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/users/:user_id"} element={<User />} />
            <Route path={"*"} element={<Errors />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
