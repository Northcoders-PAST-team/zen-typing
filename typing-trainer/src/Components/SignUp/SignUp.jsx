import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function SignUp({ auth }) {
  let navigate = useNavigate();
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
          console.log("user created", cred.user);
          const docRef = doc(db, "users", cred.user.uid);
          return setDoc(docRef, {
            email: signUp.email,
            createdAt: serverTimestamp(),
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("password does not match");
    }
  }
  return (
    <form onSubmit={signupUser}>
      <div className="container">
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account.</p>

        <label>
          <b>Email</b>
        </label>
        <input
          type="text"
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

        <br />
        <br />
        <div onSubmit={signupUser}>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
