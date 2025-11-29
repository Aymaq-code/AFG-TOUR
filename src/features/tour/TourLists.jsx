import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { useState } from "react";

export default function TourLists({ tours }) {
  const [veiwMore, setViewMore] = useState(false);
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
  } = tours;

  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div
      className={
        !veiwMore
          ? "bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-2xl  border border-white/20 hover:border-white/30 group h-[460px] "
          : "bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-2xl  border border-white/20 hover:border-white/30 group "
      }>
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
          ${adultPrice}
        </div>
        <div className="absolute top-3 left-3">
          {/* <StarRating rating={rating} /> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
          {name}
        </h3>

        {/* Tourist Spots */}
        <div className="space-y-2">
          <a
            className="text-stone-100 font-semibold text-sm cursor-pointer"
            onClick={() => setViewMore((prev) => !prev)}>
            Veiw Tourist Spots &#8595;
          </a>
          <div className="space-y-2 ">
            {veiwMore && (
              <ul className="space-y-1">
                {touristSpots.map((spot, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <div>
                      <span className="text-white font-medium text-sm">
                        {spot.name}
                      </span>
                      <p className="text-stone-300 text-xs">
                        {spot.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-2 flex-wrap text-stone-100">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs ">
            ⏱ {days}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs ">
            👥 {pax}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-stone-100 hover:text-cyan-300 text-sm font-medium transition-colors">
            View on Map
          </a>

          <Button to={`/tourFullDetails/${id}`} type="glass" size="md">
            View Full Details
          </Button>
        </div>
      </div>
    </div>
  );
}
