import React from 'react';
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default function SignIn() {

    const signInWithGoogle = () => { //mekker popup for å logge inn med google
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return(
        <button onClick={signInWithGoogle}>Sign in with google</button>
    )
};