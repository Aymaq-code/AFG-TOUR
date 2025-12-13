// Header.jsx
import { useState, useEffect } from "react";
import Logo from "../common/Logo";
import MenuToggle from "../common/MenuToggle";
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

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpen, isMobile]);

  return (
    <header
      className={
        isMenuOpen
          ? " bg-black/30 backdrop-blur-3xl w-full h-full py-6 px-4 fixed top-0 z-[1000] "
          : "w-full  px-4 flex justify-between items-center flex-col md:flex-row "
      }>
      {/* Logo - Always visible */}
      <div className="w-full md:w-auto flex justify-between items-center logaAnimate">
        <Logo />
        {/* Menu Toggle - Only visible on mobile */}
        {isMobile && (
          <MenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </div>

      {/* Navigation and Search - Conditionally rendered based on screen size */}
      <div
        className={`
          md:justify-between 
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
        {/* <SearchTour isMobile={isMobile} /> */}
      </div>
    </header>
  );
}
