import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
        setError(null);
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
    console.log(auth.currentUser, "here");
  }

  return (
    <div>
      <Link to="/">
        {" "}
        <button onClick={signInWithGoogle} className="btn btn-success">
          Sign in with Google
          <img
            src="https://img.icons8.com/clouds/100/000000/gmail-new.png"
            alt="google mail"
            className="google"
          />
        </button>
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

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <Link to="/signup">Create account</Link>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default SignIn;
