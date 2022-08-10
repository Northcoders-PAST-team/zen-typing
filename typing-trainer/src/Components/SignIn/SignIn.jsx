import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
function SignIn({ auth }) {
  let navigate = useNavigate();
  //set login details state with Email
  const [error, setError] = useState(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function loginHandler(e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  function loginUser(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((cred) => {
        console.log("user logged in", cred.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function signInWithGoogle() {
    //google authentication provider

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    //sign in with google popup
    signInWithPopup(auth, provider);
  }

  return (
    <div>
      <Link to="/">
        {" "}
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </Link>

      <form onSubmit={loginUser}>
        <div className="container">
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={login.email}
            required
            onChange={loginHandler}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={login.password}
            required
            onChange={loginHandler}
          />
          <br />
          <br />

          <button type="submit">Login</button>
        </div>
      </form>
      <Link to="/signup">Create account</Link>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default SignIn;
