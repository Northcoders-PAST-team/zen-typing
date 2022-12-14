import "./SignUp.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import SideNav from "../SideNav/SideNav";
import Loading from "../Loading/Loading";
import { UserContext } from "../User/UserContext";
import { useContext } from "react";

function SignUp() {
  const { auth } = useContext(UserContext);
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    e.preventDefault();

    if (signUp.password === signUp.repeatPassword) {
      createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
        .then((cred) => {
          navigate("/", { replace: true });
          setError(null);
          setLoading(false);
          console.log("user created", cred.user);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
          console.log(err);
        });
    } else {
      setError("password does not match");
      setLoading(false);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <div>
      <SideNav />
      <div className="form-container">
        <form onSubmit={signupUser} autoComplete="off">
          <h1 className="form-title">
            Please fill in this form to create an account.
          </h1>
          {error ? <p className="form-error">{error}</p> : null}
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
      </div>
    </div>
  );
}

export default SignUp;
