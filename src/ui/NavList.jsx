// NavList.jsx
import { NavLink } from "react-router-dom";

export default function NavList({ isMobile }) {
  return (
    <nav className={`${isMobile ? "w-full" : ""}`}>
      <ul
        className={`
        space-x-10 flex text-white 
        ${isMobile ? "flex-col space-x-0 space-y-4 py-4 px-6" : "flex-row"}
        transition-all duration-300
      `}>
        <NavLink to="/tours" className="navLink">
          Tours
        </NavLink>
        <NavLink className="navLink">Blog</NavLink>
        <NavLink className="navLink">About</NavLink>
        <NavLink className="navLink">Contact us</NavLink>
      </ul>
    </nav>
  );
}
