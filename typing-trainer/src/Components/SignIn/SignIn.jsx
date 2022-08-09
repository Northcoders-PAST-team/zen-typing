import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignIn({ auth }) {
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
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
