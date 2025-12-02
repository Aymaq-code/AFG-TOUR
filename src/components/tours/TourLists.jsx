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
      bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl 
      border border-white/20 hover:border-white/30 transition-all duration-300
      group hover:shadow-2xl
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
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
          {name}
        </h3>

        {/* Tourist Spots - Expandable Section */}
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-100 font-semibold text-sm hover:text-cyan-300 transition-colors flex items-center gap-1"
            type="button" // FIXED: Added button type for accessibility
          >
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
                  <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                  <div className="flex-1">
                    <span className="text-white font-medium text-sm block">
                      {spot.name}
                    </span>
                    <p className="text-stone-300 text-xs mt-1">
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
          <span className="bg-white/20 text-stone-100 px-3 py-1 rounded-full text-xs">
            ⏱ {days} {pluralize(days, "Day")}
          </span>
          <span className="bg-white/20 text-stone-100 px-3 py-1 rounded-full text-xs">
            👥 Up to {pax} {pluralize(pax, "Person")}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          {/* Map Link */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-100 hover:text-cyan-300 text-sm font-medium transition-colors">
            View on Map
          </a>

          {/* Details Button */}
          <Button to={`/tours/${id}`} type="glass" size="md">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
