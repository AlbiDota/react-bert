import React from 'react';
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default function SignIOut() { //logge ut av google

    return auth.currentUser && (

        <button onClick={() => auth.signOut()}>Sign out</button>
    )
};