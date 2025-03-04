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
          <NavLink to="/Spill">Spill</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li style={{  float: 'right'}}>
          <KontaktOss/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;