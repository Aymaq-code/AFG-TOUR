// Accommodation.jsx (updated)

import Button from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatters";

function Accommodation({
  accommodation,
  selectedHotel,
  onHotelSelect,
  index,
  setIndex,
}) {
  const handleHotelSelection = (hotel) => {
    onHotelSelect(hotel);
    alert(
      `${hotel.stars} star hotel selected: ${
        hotel.hotel
      }\nPrice: ${formatCurrency(hotel.price)}`
    );
  };

  return (
    <div className="bg-gray-100 rounded-xl px-5 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/50">
      <div className="py-5">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
            Accommodation
          </h3>
          <h3 className="text-stone-200">
            Select the accommodation for the trip.
          </h3>
        </div>
        {accommodation.map((item, idx) => (
          <div
            onClick={() => handleHotelSelection(item)}
            key={idx}
            className={`bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md mt-2 cursor-pointer hover:bg-white/30 transition-all duration-300 ${
              selectedHotel?.hotel === item.hotel ? "ring-2 ring-cyan-400" : ""
            }`}>
            <h3 className="text-stone-100 font-semibold flex flex-col gap-1 w-[45%]">
              <span>{item.hotel}</span>
              <span>{"⭐".repeat(item.stars)}</span>
            </h3>
            <p className="text-stone-300 text-sm">{item.room}</p>
            <p className="text-stone-100 text-sm font-semibold">
              Price: {formatCurrency(item.price)}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-7">
          <Button type="glass" size="sm" onClick={() => setIndex(index - 1)}>
            Back
          </Button>
          {selectedHotel && (
            <Button type="glass" size="sm" onClick={() => setIndex(index + 1)}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accommodation;
