import { NavLink } from "react-router-dom";
import KontaktOss from "./KontaktOss";
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
        <li>
          <KontaktOss/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;