import { NavLink } from "react-router-dom";
import KontaktOss from "./KontaktOss";
const NavBar = () => {
  return (

    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Spill">Spill</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li style={{ position:"relative", float: 'right'}}>
          <KontaktOss/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;