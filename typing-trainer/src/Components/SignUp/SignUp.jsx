import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
      <form onSubmit={signupUser}>
        <div className="container">
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account.</p>

          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            autofocus
            placeholder="Enter Email"
            name="email"
            required
            value={signUp.email}
            onChange={signupHandler}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={signUp.password}
            required
            onChange={signupHandler}
          />

          <label>
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            value={signUp.repeatPassword}
            required
            onChange={signupHandler}
          />

          {/* <label>
            <b>Full name</b>
          </label>
          <input
            type="text"
            placeholder="Full name"
            name="displayName"
            value={signUp.displayName}
            required
            onChange={signupHandler}
          /> */}

          <br />
          <br />
          <div onSubmit={signupUser}>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default SignUp;
