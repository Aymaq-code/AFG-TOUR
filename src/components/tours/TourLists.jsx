import { useState } from "react";
import Button from "../common/Button";
import { generateMapsUrl, pluralize } from "../../utils/helpers";
import { formatCurrency } from "../../utils/formatters";

// Components

/**
 * Tour Card Component
 * Displays individual tour package information with expandable details
 */
export default function TourList({ tour }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Destructure tour properties
  const {
    id,
    name,
    adultPrice,
    imageUrl,
    touristSpots,
    latitude,
    longitude,
    days,
    pax,
  } = tour;

  // Generate Google Maps URL
  const mapUrl = generateMapsUrl(latitude, longitude);

  return (
    <div
      className={`
   bg-stone-100 rounded-2xl p-6 shadow-black/40 shadow-[0_2px_4px]
       transition-all duration-300
      group hover:shadow-[0_1px_1px] hover:translate-y-1
      ${isExpanded ? "h-auto" : "h-[460px]"}
    `}>
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={imageUrl}
          alt={`${name} tour package`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {formatCurrency(adultPrice)}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {/* Tour Name */}
        <h3 className="text-xl font-bold text-stone-950 group-hover:text-[#3E2723] transition-all duration-300">
          {name}
        </h3>

        {/* Tourist Spots - Expandable Section */}
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-800 font-semibold text-sm hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            type="button">
            {isExpanded ? "Hide" : "View"} Tourist Spots
            <span
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}>
              ↓
            </span>
          </button>

          {/* Tourist Spots List */}
          {isExpanded && (
            <ul className="space-y-2">
              {touristSpots.map((spot, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#4E342E] mt-1 flex-shrink-0">•</span>
                  <div className="flex-1">
                    <span className="text-stone-800 font-medium text-sm block">
                      {spot.name}
                    </span>
                    <p className="text-stone-700 text-xs mt-1">
                      {spot.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tour Features */}
        <div className="flex gap-2 flex-wrap">
          <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs">
            {/* ⏱ {days} {pluralize(days, "Day")} */}⏱ {days}
          </span>
          <span className="bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs">
            👥 Up to {pax} {pluralize(pax, "Person")}
          </span>
        </div>

        {/* Map Link */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-300">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-800 hover:text-cyan-300 text-sm font-medium transition-colors">
            View on Map
          </a>

          {/* Details Button */}
          <Button to={`/tours/${id}`} type="tertiary" size="md">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
