import "./SignIn.scss";

import { useState } from "react";
import { db } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { serverTimestamp, setDoc, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../User/UserContext";
import { useContext } from "react";
import Loading from "../Loading/Loading";
import SideNav from "../SideNav/SideNav";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SignIn() {
  const { user, auth } = useContext(UserContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((cred) => {
        setError(null);
        setLoading(false);
        console.log("user logged in", cred.user);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
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

  return loading ? (
    <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      {/* <div className="side-nav"> */}
      <SideNav />
      {/* </div> */}
      <div className="width-100 center pt-70">
        <Link to="/" className="center">
          <button
            onClick={signInWithGoogle}
            className="btn btn-success wide-button"
          >
            Sign in with Google
            <img
              src="https://img.icons8.com/clouds/100/000000/gmail-new.png"
              alt="google mail"
              className="google"
            />
          </button>
        </Link>

        <form onSubmit={loginUser} autocomplete="off">
          <div className="container margin-0">
            <input
              type="text"
              autoFocus
              aria-label="Email"
              placeholder="Enter Username"
              name="email"
              value={login.email}
              required
              onChange={loginHandler}
            />
            <input
              type="password"
              aria-label="Password"
              placeholder="Enter Password"
              name="password"
              value={login.password}
              required
              onChange={loginHandler}
            />
            <button type="submit" className="btn btn-primary wide-button">
              Login
            </button>
          </div>
        </form>
        <Link to="/signup" className="referral-link">
          Not registered? Create an account here
        </Link>
        {error ? <p>{error}</p> : null}
      </div>
    </>
  );
}

export default SignIn;
