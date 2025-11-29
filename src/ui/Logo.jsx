import { Link } from "react-router-dom";
import LOGO from "../../public/logo_1.png";
import Button from "./Button";
export default function Logo() {
  return (
    <Link to="/">
      <img src={LOGO} className="h-20" alt="logo" />
    </Link>
  );
}
