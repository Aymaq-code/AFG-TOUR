import { useEffect, useRef, useState } from "react";
import { setShowNavbar } from "../Tours/tourSlice";
import { useDispatch } from "react-redux";

export default function TourOverview() {
  const [activeSection, setActiveSection] = useState("overview");

  // Scroll references
  const overviewRef = useRef(null);
  const mapRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (!overviewRef.current || !mapRef.current) return;

      const overviewTop = overviewRef.current.getBoundingClientRect().top;
      const mapBottom = mapRef.current.getBoundingClientRect().bottom;

      if (overviewTop <= window.innerHeight * 0.2 && mapBottom > 0) {
        dispatch(setShowNavbar(true));
      } else {
        dispatch(setShowNavbar(false));
      }

      // Track active section
      const sections = [
        "overview",
        "itinerary",
        "includes",
        "info",
        "map",
        "review",
      ];
      const scrollPosition = window.scrollY + window.innerHeight * 0.2; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  return (
    <section id="overview" ref={overviewRef}>
      <h2 className="text-stone-900 text-3xl font-semibold tracking-wider pt-17 pb-7 ">
        Overview
      </h2>
      <p className="text-stone-800">
        Experience Dubai like never before with this exclusive 5-day tour —
        carefully designed for travelers who seek the perfect balance of
        adventure, culture, and luxury. Every detail has been thoughtfully
        planned so that nothing feels rushed, allowing you to fully immerse
        yourself in each experience.
      </p>
      <p className="text-stone-800 mt-4">
        From soaring above the desert in a hot air balloon to standing atop the
        world's tallest building and enjoying the thrills of the red dunes, each
        moment is curated for excitement, wonder, and relaxation. Unlike typical
        tours where you are guided in a group, this is a special, personalized
        journey: you will be assigned a dedicated{" "}
        <strong>travel consultant</strong> who will be in contact with you at
        every step, coordinating your itinerary, assisting with optional
        experiences, and ensuring your Dubai adventure flows seamlessly.
      </p>
      <h2 className="text-stone-900 text-3xl font-semibold tracking-wider mb-7 mt-7">
        Highlights
      </h2>
      <ul className="wpte-trip-highlights text-stone-800">
        <li className="text-xl">
          <p className="text-[15px]">
            The World's Most Customizable Dubai Experience – designed for both
            visitors and residents seeking the perfect balance of luxury,
            adventure, and freedom.
          </p>
        </li>
        <li class="text-xl">
          <p className="text-[15px]">
            Personal Travel Consultant – assigned exclusively to you, managing
            every detail of your journey and staying in touch throughout your
            trip.
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Deluxe Hot Air Balloon Adventure – witness the sunrise over the
            Dubai Desert Conservation Reserve, complete with in-flight falconry
            and Bedouin breakfast.
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Burj Khalifa "At The Top" Premium Experience – enjoy priority access
            to the highest observation decks with gourmet treats and unmatched
            skyline views.
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Old Dubai Cultural &amp; Heritage Tour – explore the soul of the
            city through traditional markets, museums, and local experiences.
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Premium Red Dunes Desert Safari – thrilling dune bashing, camel
            rides, sunset views, and a luxury desert dinner under the stars.
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Supercar or Luxury Drive Experience – rent a Ferrari or Rolls-Royce,
            to explore Dubai in absolute style (optional).
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Six Emirates Day Tour – experience six of the seven Emirates in one
            unforgettable day (optional).
          </p>
        </li>
        <li class="text-xl">
          <p p className="text-[15px]">
            Flexible Schedule – built-in free time to rest, shop, or explore
            independently — enjoy Dubai entirely at your own pace.
          </p>
        </li>
        <li class="text-xl">
          <p className="text-[15px]">
            Comfort &amp; Care – non-smoking vehicles, professional chauffeurs,
            and carefully planned routes for a smooth and relaxing experience.{" "}
          </p>
        </li>
        <li class="text-xl">
          <p className="text-[15px]">
            Full Support, Every Step – your consultant remains available for any
            last-minute plans, upgrades, or personalized arrangements.
          </p>
        </li>
      </ul>
      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
}
