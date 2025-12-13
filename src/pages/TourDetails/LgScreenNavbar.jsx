export default function LgScreenNavbar() {
  return (
    <nav className="text-stone-900">
      <ul className="flex gap-3 flex-wrap justify-between lg:gap-15 text-[19px] border-stone-400 border-b-[1px] py-4">
        <li>
          <a
            href="#overview"
            className="hover:text-[#607D8B] transition-all duration-500">
            Overview
          </a>
        </li>
        <li>
          <a
            href="#itinerary"
            className="hover:text-[#607D8B] transition-all duration-500">
            Itinerary
          </a>
        </li>
        <li>
          <a
            href="#includes"
            className="hover:text-[#607D8B] transition-all duration-500">
            Includes
          </a>
        </li>
        <li>
          <a
            href="#info"
            className="hover:text-[#607D8B] transition-all duration-500">
            Important Information
          </a>
        </li>
        <li>
          <a
            href="#map"
            className="hover:text-[#607D8B] transition-all duration-500">
            Map
          </a>
        </li>
      </ul>
    </nav>
  );
}
