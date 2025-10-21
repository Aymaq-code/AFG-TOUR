// MenuToggle.jsx
export default function MenuToggle({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      className={`menu-toggle z-50 ${isMenuOpen ? "open" : ""}`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
