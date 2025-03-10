import React from "react";
import { auth } from "../../firebase";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SignOut() {

    const signInWithGoogle = () => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in with:",result.user);
            })
            .catch((error) => {
                console.log("ERROR DURING SIGN-IN",error);
            })
        }

    const [user] = useAuthState(auth);
        return (<>{ user ?
             <button onClick={() => signOut(auth)}>Sign Out</button>
             : <button className="sign-in" onClick={signInWithGoogle}>Sign In</button>}
        </>);
}