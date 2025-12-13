import { forwardRef } from "react";

const MapSection = forwardRef((props, ref) => {
  return (
    <section id="map" ref={ref}>
      <h2 className="font-semibold text-4xl text-stone-900 pt-17 pb-7">Map</h2>
      <div className="mt-4 shadow-black/40 shadow-[0_2px_4px] rounded-2xl overflow-hidden">
        <iframe
          title="Kabul Map"
          src="https://maps.google.com/maps?q=34.5553,69.2075&z=12&output=embed"
          className="w-full h-80 rounded-lg shadow-lg"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </div>
      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
});

MapSection.displayName = "MapSection";
export default MapSection;
