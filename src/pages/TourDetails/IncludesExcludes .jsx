export default function IncludesExcludes() {
  const includes = [
    "A dedicated personal Travel Consultant to guide and assist you throughout your journey.",
    "Airport pickup upon arrival in Dubai.",
    "Deluxe Hot Air Balloon Adventure over the Dubai Desert Conservation Reserve.",
    "Burj Khalifa 'At The Top' Premium Experience.",
    "Old Dubai Cultural & Heritage Tour.",
    "Premium Red Dunes Desert Safari",
  ];

  const excludes = [
    "Pick-up after the Burj Khalifa 'At The Top' Premium Experience (Optional).",
    "Pick-up after the Old Dubai Cultural Tour (Optional).",
    "Airport drop-off at the end of the tour (Optional).",
  ];

  return (
    <section id="includes" className="">
      <div>
        <h2 className="text-stone-900 text-3xl font-semibold tracking-wider pt-17 pb-7">
          Includes
        </h2>
        <h2 className="text-stone-800 text-2xl font-semibold mb-4">
          Cost Includes
        </h2>
        <ul className="wpte-trip-highlights includes text-stone-700">
          {includes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h2 className="text-stone-900 text-2xl font-semibold mb-4 mt-15">
          Cost Excludes
        </h2>
        <ul className="wpte-trip-highlights excludes text-stone-700">
          {excludes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
}
