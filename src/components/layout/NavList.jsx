// NavList.jsx
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function NavList({ isMobile }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const username = useSelector((state) => state.user.username);
  return (
    <nav className={`${!isMobile ? "w-full" : ""}`}>
      <ul
        className={`
        space-x-10 flex text-white
        ${isMobile ? "flex-col space-x-0 space-y-4 py-4 px-6" : "flex-row"}
        transition-all duration-300
      `}>
        <NavLink to="/tours" className="navLink">
          Tours
        </NavLink>
        <NavLink to="/about" className="navLink">
          About
        </NavLink>
        <NavLink to="/contact" className="navLink ">
          Contact
        </NavLink>
        {username && (
          <li className="font-semibold text-xl border-stone-100 rounded-[4px] border-2 flex justify-center items-center uppercase px-4">
            {username}
          </li>
        )}
      </ul>
    </nav>
  );
}
