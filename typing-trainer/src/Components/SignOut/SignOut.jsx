import { useNavigate } from "react-router-dom";

function SignOut({ auth }) {
  let navigate = useNavigate();
  function logOut() {
    navigate("/", { replace: true });
    auth.signOut();
  }

  return auth.currentUser && <button onClick={logOut}>Sign out</button>;
}

export default SignOut;
