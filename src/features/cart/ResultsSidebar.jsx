import React from "react";
import { useRegistrationStore } from "../../store/registrationStore";
import { formatCurrency, formatPrice } from "../../utils/formatters";
import ExtraServices from "./ExtraServices";

export default function ResultsSidebar({ name }) {
  const adultUnitPrice = useRegistrationStore((s) => s.adultUnitPrice);
  const childUnitPrice = useRegistrationStore((s) => s.childUnitPrice);
  const adultQuantity = useRegistrationStore((s) => s.adultQuantity);
  const childQuantity = useRegistrationStore((s) => s.childQuantity);
  const selectedHotel = useRegistrationStore((s) => s.selectedHotel);
  const selectedExtras = useRegistrationStore((s) => s.selectedServices);

  const startDate = useRegistrationStore((s) => s.startDate);
  const getTotal = useRegistrationStore((s) => s.getTotal);

  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extra.price,
    0
  );

  const total = getTotal();

  return (
    <div className="w-full h-full">
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
        </div>

        {startDate && (
          <div className="bg-slate-700/50 rounded-lg px-4 py-2 mt-2">
            <p className="text-slate-400 mb-1">Travellers</p>

            <div className="flex justify-between">
              <span>Adults ({adultQuantity})</span>
              <span>{formatPrice(adultUnitPrice * adultQuantity)}</span>
            </div>

            {childQuantity > 0 && (
              <div className="flex justify-between">
                <span>Children ({childQuantity})</span>
                <span>{formatPrice(childUnitPrice * childQuantity)}</span>
              </div>
            )}

            <div className="border-t border-slate-600 pt-1 mt-2">
              <div className="flex justify-between font-semibold">
                <p>Total Persons:</p>
                <p>{adultQuantity + (childQuantity || 0)}</p>
              </div>
            </div>
          </div>
        )}

        {selectedHotel && (
          <div className="bg-slate-700/50 rounded-lg px-4 py-2">
            <p className="text-slate-400 mb-1">Selected Hotel</p>

            <div className="flex justify-between mb-1">
              <p>{selectedHotel.hotel}</p>
              <p>{formatPrice(selectedHotel.price)}</p>
            </div>

            <span>{formatCurrency(selectedHotel.price)}</span>

            <div className="text-sm text-slate-300">
              {selectedHotel.room} • {"⭐".repeat(selectedHotel.stars)}
            </div>
          </div>
        )}

        {/* Added extra sercices */}
        {selectedExtras.length > 0 && (
          <div className="bg-slate-700/50 rounded-lg px-4 py-2 mt-2 ">
            <p className="text-slate-400 mb-2">Selected Services</p>
            {selectedExtras.map((service) => (
              <div key={service.id} className="flex justify-between mb-1">
                <p className="text-sm">{service.title}</p>
                <p className="text-sm">{formatPrice(service.price)}</p>
              </div>
            ))}
            <div className="border-t border-slate-600 pt-1 mt-2">
              <div className="flex justify-between font-semibold">
                <p>Services Total:</p>
                <p>{formatPrice(extrasTotal)}</p>
              </div>
            </div>
          </div>
        )}

        {startDate && (
          <div className="bg-slate-700/50 rounded-lg px-4 py-2 mt-2">
            <p className="text-slate-400">Total Price</p>
            <p className="text-2xl font-bold text-cyan-400">
              {formatPrice(total)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
