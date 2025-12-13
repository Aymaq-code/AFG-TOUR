export default function ImportantInfo() {
  const infoItems = [
    {
      title: "Optional Services:",
      content:
        "All services marked as (Optional) throughout the itinerary are not included in the base package price. These can be added during the booking process for an enhanced, fully customized experience tailored to your preferences.",
    },
    {
      title: "Inclusions:",
      content:
        "Everything explicitly mentioned in the itinerary is included in your package unless marked as (Optional).",
    },
    {
      title: "Age Requirement For the Tour:",
      content: "Only for guests aged 7 to 80 years.",
    },
    {
      title: "Age Requirement For our Rental Cars:",
      content: "Only for guests aged 25+ years.",
    },
    {
      title: "Accessibility:",
      content:
        "Please note that this tour is not wheelchair accessible due to the nature of certain experiences and terrain.",
    },
    {
      title: "Transportation Policy:",
      content:
        "All vehicles used for transfers and tours are strictly non-smoking. Any violation of this policy will result in a fine of AED 2,000 + applicable taxes.",
    },
    {
      title: "Health & Safety:",
      content:
        "Guests are advised to inform their travel consultant of any medical conditions or dietary requirements in advance to ensure suitable arrangements are made.",
    },
    {
      title: "Dress Code & Etiquette:",
      content:
        "Comfortable, modest clothing is recommended, especially when visiting cultural or religious sites.",
    },
    {
      title: "Travel Consultant Assistance:",
      content:
        "Your dedicated travel consultant will remain in touch throughout your journey to assist with any special requests, last-minute changes, or additional arrangements.",
    },
  ];

  return (
    <section id="info">
      <h2 className="font-semibold text-3xl text-stone-900 pt-17 pb-7">
        Important Information
      </h2>
      <ul className="list-disc text-stone-800 mt-8 ml-4">
        {infoItems.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <br />
            {item.content}
          </li>
        ))}
      </ul>
      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
}
