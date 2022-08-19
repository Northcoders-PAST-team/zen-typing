import "./SignIn.scss";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { auth } = useContext(UserContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    signInWithPopup(auth, provider);
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <>
      <SideNav />
      <div className="form-container">
        <form onSubmit={loginUser} autocomplete="off">
          <h1 className="form-title">Sign in:</h1>
          {error ? <p className="form-error">{error}</p> : null}
          <input
            type="text"
            autoFocus
            aria-label="Email"
            placeholder="Enter Username"
            name="email"
            value={login.email}
            required
            onChange={loginHandler}
            className="form-input"
          />
          <input
            type="password"
            aria-label="Password"
            placeholder="Enter Password"
            name="password"
            value={login.password}
            required
            onChange={loginHandler}
            className="form-input"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <Link
          to="/"
          className="center button-container"
          style={{ textDecoration: "none" }}
        >
          <button onClick={signInWithGoogle} className="btn btn-success">
            Sign in with Google
            <img
              src="https://img.icons8.com/clouds/100/000000/gmail-new.png"
              alt="google mail"
              className="google"
            />
          </button>
        </Link>
        <Link
          to="/signup"
          className="referral-link"
          style={{ textDecoration: "none" }}
        >
          Not registered? <u>Create an account here</u>
        </Link>
      </div>
    </>
  );
}

export default SignIn;
