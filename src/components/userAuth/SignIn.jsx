import React from "react";

import { auth } from "../../firebase"; // Import auth from firebase.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function SignIn() {

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
  
    return (
      <><div style={{flex:0.3}}/>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <div style={{flex:1}}/></>
    )
  
}