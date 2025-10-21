import LOGO from "../../public/logo.png";
import Button from "./Button";
export default function Logo() {
  return (
    <Button to="/">
      <img src={LOGO} className="h-17 w-55" alt="logo" />
    </Button>
  );
}
