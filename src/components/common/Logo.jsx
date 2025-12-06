import { Link } from "react-router-dom";
import LOGO from "../../../public/logo_1.png";
export default function Logo() {
  return (
    <Link to="/">
      <img src={LOGO} className="h-17 mt-3 mb-2 " alt="logo" />
    </Link>
  );
}
