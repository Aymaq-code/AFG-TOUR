export default function ResponsiveNavbar({ showNavbar, activeSection }) {
  if (!showNavbar) return null;

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "includes", label: "Includes" },
    { id: "info", label: "Important Info" },
    { id: "map", label: "Map" },
    { id: "review", label: "Review" },
  ];

  return (
    <nav className="text-stone-900 fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm transition-all duration-700">
      <ul className="flex-wrap flex text-[19px] py-2 lg:py-4 justify-between lg:justify-center items-center gap-2 lg:gap-15 px-2">
        {sections.map((section) => (
          <li
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`hover:text-[#546E7A] border-0 transition-all duration-300 cursor-pointer ${
              activeSection === section.id
                ? "border-b-[2px] border-[#5D4037]"
                : ""
            }`}>
            {section.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
