import { NavLink } from "react-router-dom";
import KontaktOss from "./KontaktOss";
const NavBar = () => {
  return (

    <nav>
        <style>
            {`
            ul {
            margin: 0;
            overflow: hidden;
            padding:0;
            background-color:rgb(224, 185, 9);
            }

            li {
            float: left;
            display: block;
            padding: 16px;
            color:rgb(0, 255, 106);
            
            }

            ul li a {
            color: #000;
            font-size: 55px;
            text-align: center;
            text-decoration: none;
            padding: 14px 16px;
            border-radius: 40px;
            }

            ul li a:hover {
            background-color: #45a049;
            }

            ul li a.active {
            color: #00a8ff;
            background-color:rgb(255, 0, 0);
            }

            .open-button {
            
            background-color:rgb(224, 185, 9);
            color: black;
            border: none;
            cursor: pointer;
            font-size: 55px;
            border-radius: 18px;
            }

            .open-button:hover {
              background-color: #45a049;
            }
            
            .open-button:active {
            color: #00a8ff;
            background-color:rgb(255, 0, 0);
            }


            .kontaktInfo  {
              z-index:3;
              margin-top: 20px;
              color: black;
              padding: 15px;  
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
              width: 300px;  
              max-width: 100%;  
              margin-left: auto;
              margin-right: auto;  
              text-align: left;  
            }
            `}
        </style>
      <ul>
        <li>
          <NavLink to="/Home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Spill">Spill</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
        <li style={{ float: 'right'}}>
          <KontaktOss/>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;