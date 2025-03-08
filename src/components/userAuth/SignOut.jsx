import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function SignOut() {
  return (
    <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}