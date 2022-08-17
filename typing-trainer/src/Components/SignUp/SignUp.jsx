import "./SignUp.scss";

import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import SideNav from "../SideNav/SideNav";

import { UserContext } from "../User/UserContext";
import { useContext } from "react";

function SignUp() {
  const { user, auth } = useContext(UserContext);
  //navigate hook initialized
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  //set signup details state with Email
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  function signupHandler(e) {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  }

  function signupUser(e) {
    e.preventDefault();

    if (signUp.password === signUp.repeatPassword) {
      createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
        .then((cred) => {
          navigate("/", { replace: true });
          setError(null);
          console.log("user created", cred.user);
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        });
    } else {
      setError("password does not match");
    }
  }
  return (
    <div>
      <SideNav />
      <div className="form-container">
        <form onSubmit={signupUser} autoComplete="off">
          <h1 className="form-title">
            Please fill in this form to create an account.
          </h1>

          <input
            type="text"
            autoFocus
            aria-label="Email"
            placeholder="Enter Email"
            name="email"
            required
            value={signUp.email}
            onChange={signupHandler}
            className="form-input"
          />

          <input
            type="password"
            aria-label="Password"
            placeholder="Enter Password"
            name="password"
            value={signUp.password}
            required
            onChange={signupHandler}
            className="form-input"
          />
          <input
            type="password"
            aria-label="Repeat Password"
            placeholder="Repeat Password"
            name="repeatPassword"
            value={signUp.repeatPassword}
            required
            onChange={signupHandler}
            className="form-input"
          />

          <br />

          <button type="submit" className="btn btn-primary wide-button">
            Sign Up
          </button>
        </form>
        {error ? <p>{error}</p> : null}
      </div>
    </div>
  );
}

export default SignUp;
