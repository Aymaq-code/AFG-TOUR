// Header.jsx
import { useState, useEffect } from "react";
import SearchTour from "../features/booking/SearchTour";
import Logo from "./Logo";
import MenuToggle from "./MenuToggle";
import NavList from "./NavList";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if window is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMenuOpen && !event.target.closest("header")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile, isMenuOpen]);

  return (
    <header
      className={
        isMenuOpen
          ? " bg-white/30 backdrop-blur-sm absolute z-999 w-full h-full "
          : "w-full p-3.5 px-5 flex justify-between items-center flex-col md:flex-row"
      }>
      {/* Logo - Always visible */}
      <div className="w-full md:w-auto flex justify-between items-center">
        <Logo />
        {/* Menu Toggle - Only visible on mobile */}
        {isMobile && (
          <MenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </div>

      {/* Navigation and Search - Conditionally rendered based on screen size */}
      <div
        className={`
        w-full md:w-[60%] md:justify-between 
        transition-all duration-300 ease-in-out 
        ${
          isMobile
            ? `overflow-hidden ${
                isMenuOpen ? "max-h-96 opacity-100 mt-7" : "max-h-0 opacity-0"
              }`
            : "flex items-center space-x-4"
        }
      `}>
        <NavList isMobile={isMobile} />
        <SearchTour isMobile={isMobile} />
      </div>
    </header>
  );
}
