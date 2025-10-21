import LOGO from "../../public/logo.png";
import Button from "./Button";
export default function Logo() {
  return (
    <Button to="/">
      <img src={LOGO} className="h-14 w-50" alt="logo" />
    </Button>
  );
}
