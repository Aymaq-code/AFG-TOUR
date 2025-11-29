// src/components/ResultsSidebar.js
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

function ResultsSidebar({
  name,
  startDate,
  selectedHotel,
  selectedServices,
  adultPrice,
  childPrice,
}) {
  const adult = useSelector((state) =>
    state.cart.items.find((i) => i.id === "adult")
  );
  const child = useSelector((state) =>
    state.cart.items.find((i) => i.id === "child")
  );
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const adultTotalFare = adult ? adult.unitPrice * adult.quantity : 0;
  const childTotalFare = child ? child.unitPrice * child.quantity : 0;

  // Calculate total services price
  const totalServicesPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalPriceWithEverything =
    totalPrice + (selectedHotel ? selectedHotel.price : 0) + totalServicesPrice;

  return (
    <div className="w-full ">
      <div className=" h-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl py-6 px-5 text-white shadow-xl shadow-slate-900/50 ">
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

          {startDate && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400 mb-1">Travellers</p>

              <div className="flex justify-between mb-1">
                <p>
                  Adult x {adult.quantity} @ USD{adultPrice}
                </p>
                <p>USD {adultTotalFare}</p>
              </div>

              <div className="flex justify-between">
                <p>
                  Child x {child.quantity} @ USD{childPrice}
                </p>
                <p>USD {childTotalFare}</p>
              </div>

              <div className="border-t border-slate-600 pt-1 mt-2">
                <div className="flex justify-between font-semibold">
                  <p>Total Persons:</p>
                  <p>{adult.quantity + child.quantity}</p>
                </div>
              </div>
            </div>
          )}

          {selectedHotel && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400 mb-1">Selected Hotel</p>
              <div className="flex justify-between mb-1">
                <p>{selectedHotel.hotel}</p>
                <p>USD {selectedHotel.price}.00</p>
              </div>
            </div>
          )}

          {selectedServices.length > 0 && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2 ">
              <p className="text-slate-400 mb-2">Selected Services</p>
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between mb-1">
                  <p className="text-sm">{service.title}</p>
                  <p className="text-sm">USD {service.price}.00</p>
                </div>
              ))}
              <div className="border-t border-slate-600 pt-1 mt-2">
                <div className="flex justify-between font-semibold">
                  <p>Services Total:</p>
                  <p>USD {totalServicesPrice}.00</p>
                </div>
              </div>
            </div>
          )}

          {startDate && (
            <div className="bg-slate-700/50 rounded-lg px-4 py-2">
              <p className="text-slate-400">Total Price</p>
              <p className="text-2xl font-bold text-cyan-400">
                USD {totalPriceWithEverything}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsSidebar;
