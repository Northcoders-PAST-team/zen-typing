import { Link } from "react-router-dom";

function SignOut({ auth }) {
  function logOut() {
    auth.signOut();
    const usersRef = doc(db, "users", user.uid);
    updateDoc(usersRef, {
      online: false,
    });
  }

  return (
    auth.currentUser && (
      <Link to="/">
        <button onClick={logOut}>Sign out</button>
      </Link>
    )
  );
}

export default SignOut;
