import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatters";

function ResultsSidebar({
  name,
  startDate,
  selectedHotel,
  selectedServices,
  adultPrice,
  childPrice,
}) {
  // ⭐ Get all cart data from Redux
  const {
    items,
    selectedHotel: reduxHotel,
    selectedExtras,
    totalPrice,
  } = useSelector((state) => state.cart);

  const adult = items.find((i) => i.id === "adult");
  const child = items.find((i) => i.id === "child");

  // ⭐ Use Redux data instead of props
  const displayHotel = selectedHotel || reduxHotel;
  const displayServices =
    selectedServices.length > 0 ? selectedServices : selectedExtras;

  const adultTotalFare = adult ? adult.unitPrice * adult.quantity : 0;
  const childTotalFare = child ? child.unitPrice * child.quantity : 0;

  // Calculate total services price
  const totalServicesPrice = displayServices.reduce(
    (total, service) => total + service.price,
    0
  );

  // ⭐ Use Redux totalPrice which already includes everything
  const finalTotalPrice = totalPrice;
  const { selectedCurrency } = useSelector((state) => state.currency);

  return (
    <div className="w-full h-full ">
      <div className=" h-auto bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl py-6 px-5 text-white shadow-xl shadow-slate-900/50 ">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">
          Booking Summary
        </h3>

        <h2 className="text-2xl">{name}</h2>

        <div className="space-y-4 mt-5">
          <div className="bg-slate-700/50 rounded-lg px-4 py-2">
            <p className="text-slate-400">Start Date</p>
            <p className="font-semibold">
              {startDate ? startDate.toLocaleDateString() : "Not selected"}
            </p>
          </div>

          {startDate && adult && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400 mb-1">Travellers</p>

              <div className="flex justify-between mb-1">
                <p>
                  Adult x {adult.quantity} {selectedCurrency} {adultPrice}
                </p>
                <p>
                  {selectedCurrency} {adultTotalFare}
                </p>
              </div>

              {child.quantity > 0 && (
                <div className="flex justify-between">
                  <p>
                    Child x {child.quantity} {selectedCurrency} {childPrice}
                  </p>
                  <p>
                    {selectedCurrency} {childTotalFare}
                  </p>
                </div>
              )}

              <div className="border-t border-slate-600 pt-1 mt-2">
                <div className="flex justify-between font-semibold">
                  <p>Total Persons:</p>
                  <p>{adult.quantity + (child?.quantity || 0)}</p>
                </div>
              </div>
            </div>
          )}

          {displayHotel && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400 mb-1">Selected Hotel</p>
              <div className="flex justify-between mb-1">
                <p>{displayHotel.hotel}</p>
                <p>
                  {" "}
                  {selectedCurrency} {displayHotel.price}.00
                </p>
              </div>
              <div className="text-sm text-slate-300">
                {displayHotel.room} • {"⭐".repeat(displayHotel.stars)}
              </div>
            </div>
          )}

          {displayServices.length > 0 && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2 ">
              <p className="text-slate-400 mb-2">Selected Services</p>
              {displayServices.map((service) => (
                <div key={service.id} className="flex justify-between mb-1">
                  <p className="text-sm">{service.title}</p>
                  <p className="text-sm">USD {service.price}.00</p>
                </div>
              ))}
              <div className="border-t border-slate-600 pt-1 mt-2">
                <div className="flex justify-between font-semibold">
                  <p>Services Total:</p>
                  <p>
                    {selectedCurrency} {totalServicesPrice}.00
                  </p>
                </div>
              </div>
            </div>
          )}

          {startDate && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400">Total Price</p>
              <p className="text-2xl font-bold text-cyan-400">
                {formatCurrency(finalTotalPrice)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsSidebar;
