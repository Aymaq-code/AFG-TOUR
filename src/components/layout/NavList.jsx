// NavList.jsx
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearName } from "../../features/user/userSlice";
import Button from "../common/Button";

export default function NavList({ isMobile }) {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  return (
    <nav className={`${!isMobile ? "w-full " : ""}`}>
      <ul
        className={`
        space-x-10 flex text-white
        ${isMobile ? "flex-col space-x-0 space-y-4 py-4 px-6" : "flex-row"}
        transition-all duration-300
      `}>
        <NavLink to="/tours" className="navLink NavListAnimate_1">
          Tours
        </NavLink>
        <NavLink to="/about" className="navLink NavListAnimate_2">
          About
        </NavLink>
        <NavLink to="/contact" className="navLink NavListAnimate_3 ">
          Contact
        </NavLink>
        {username && (
          <li className="group font-semibold text-xl border-stone-100 rounded-[4px] border-2 flex justify-center items-center gap-3 uppercase px-4 relative">
            {username}

            <Button
              onClick={() => dispatch(clearName())}
              size="sm"
              className="px-3 py-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-6">
              Remove
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
