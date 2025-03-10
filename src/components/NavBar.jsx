import { NavLink } from "react-router-dom";
import KontaktOss from "./KontaktOss";
import React from 'react';
import SignOut from "./userAuth/SignOut";

const NavBar = () => {
  return (

    <nav className="navBar">
      <ul className="navBar-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/HangBertPage">HangBert</NavLink>
        </li>
        <li>
          <NavLink to="/SpinnerPage">Fidget Spinner</NavLink>
        </li>
        <li>
          <NavLink to="/ChatPage">Chat</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <div className="navBar-rightside">
            <li>
            <SignOut/>
            </li>
            <li>
            <KontaktOss/>
            </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;