import { forwardRef } from "react";

const Overview = forwardRef((props, ref) => {
  const highlights = [
    "The World's Most Customizable Dubai Experience – designed for both visitors and residents seeking the perfect balance of luxury, adventure, and freedom.",
    "Personal Travel Consultant – assigned exclusively to you, managing every detail of your journey and staying in touch throughout your trip.",
    "Deluxe Hot Air Balloon Adventure – witness the sunrise over the Dubai Desert Conservation Reserve, complete with in-flight falconry and Bedouin breakfast.",
    "Burj Khalifa 'At The Top' Premium Experience – enjoy priority access to the highest observation decks with gourmet treats and unmatched skyline views.",
    "Old Dubai Cultural & Heritage Tour – explore the soul of the city through traditional markets, museums, and local experiences.",
    "Premium Red Dunes Desert Safari – thrilling dune bashing, camel rides, sunset views, and a luxury desert dinner under the stars.",
    "Supercar or Luxury Drive Experience – rent a Ferrari or Rolls-Royce, to explore Dubai in absolute style (optional).",
    "Six Emirates Day Tour – experience six of the seven Emirates in one unforgettable day (optional).",
    "Flexible Schedule – built-in free time to rest, shop, or explore independently — enjoy Dubai entirely at your own pace.",
    "Comfort & Care – non-smoking vehicles, professional chauffeurs, and carefully planned routes for a smooth and relaxing experience.",
    "Full Support, Every Step – your consultant remains available for any last-minute plans, upgrades, or personalized arrangements.",
  ];

  return (
    <section id="overview" ref={ref}>
      <h2 className="text-stone-900 text-3xl font-semibold tracking-wider pt-17 pb-7">
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
        {highlights.map((highlight, index) => (
          <li key={index} className="text-xl">
            <p className="text-[15px]">{highlight}</p>
          </li>
        ))}
      </ul>
      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
});

Overview.displayName = "Overview";
export default Overview;
