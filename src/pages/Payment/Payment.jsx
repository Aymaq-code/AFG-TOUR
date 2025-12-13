import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../../store/registrationStore";
import Button from "../../components/common/Button";
import Header from "../../components/layout/Header";
import { PAYMENT_METHODS } from "../../utils/constants";
import { formatCurrency, formatPrice } from "../../utils/formatters";

export default function Payment() {
  const navigate = useNavigate();

  // Zustand store
  const adultUnitPrice = useRegistrationStore((s) => s.adultUnitPrice);
  const childUnitPrice = useRegistrationStore((s) => s.childUnitPrice);
  const adultQuantity = useRegistrationStore((s) => s.adultQuantity);
  const childQuantity = useRegistrationStore((s) => s.childQuantity);
  const selectedHotel = useRegistrationStore((s) => s.selectedHotel);
  const selectedExtras = useRegistrationStore((s) => s.selectedServices);
  const discount = useRegistrationStore((s) => s.discount);
  const couponCode = useRegistrationStore((s) => s.couponCode);
  const startDate = useRegistrationStore((s) => s.startDate);
  const getTotal = useRegistrationStore((s) => s.getTotal);
  const getSubtotal = useRegistrationStore((s) => s.getSubtotal);

  const [paymentMethod, setPaymentMethod] = useState("credit");

  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extra.price,
    0
  );
  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className=" payment min-h-screen bg-white ">
      <div className=" bg-[#757575] shadow-black/80 shadow-[0_0_9px_3px]">
        <Header />
      </div>

      <div className="  mx-auto px-4 lg:px-40 py-8 lg:mt-10 ">
        <div className="flex items-center mb-8 flex-col gap-7 md:flex-row ">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sky-600 hover:text-sky-500 transition-colors  cursor-pointer ">
            <span className="text-2xl mr-2">←</span>
            Back to Booking
          </button>
          <h1 className="text-4xl font-bold text-stone-900 ">
            Complete Your Booking
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="rounded-2xl p-8 shadow-lg bg-white border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <form className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border-2 ${
                        paymentMethod === method.id
                          ? "bg-[#F0F8FF] border-[#327ce2]"
                          : "bg-white border-[#D1D5DB]"
                      }`}>
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 accent-[#0056D2] "
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === "credit" && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Card Holder Name</label>
                    <input
                      required
                      type="text"
                      name="cardHolder"
                      placeholder="John Doe"
                      className="w-full border rounded-lg px-4 py-3 border-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Card Number</label>
                    <input
                      required
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border rounded-lg px-4 py-3 border-stone-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Expiry Date</label>
                      <input
                        required
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        className="w-full border rounded-lg px-4 py-3 border-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">CVV</label>
                      <input
                        required
                        type="text"
                        name="cvv"
                        placeholder="123"
                        className="w-full border rounded-lg px-4 py-3 border-stone-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coupon */}
              <div>
                <label className="block mb-2">
                  Discount Coupon {discount > 0 && `(Applied: ${couponCode})`}
                </label>
                <div className="flex gap-2 flex-col md:flex-row">
                  <input
                    required
                    type="text"
                    name="couponCode"
                    placeholder="Enter coupon code"
                    className="flex-1 border rounded-lg px-4 py-3 border-stone-400"
                  />
                  <Button type="secondary" size="md">
                    Apply
                  </Button>
                </div>
              </div>

              <Button
                type="tertiary"
                size="xl"
                onClick={(e) => e.preventDefault()}>
                Pay {formatCurrency(total)}
              </Button>

              {/* Security Notice */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  🔐 Your payment is secure and encrypted
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-8 border shadow-lg  border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-stone-200 py-2 ">
                <p className="text-stone-400 text-sm">
                  <p className="font-bold text-stone-900">Adult</p>
                  {formatPrice(adultUnitPrice)} × {adultQuantity}{" "}
                  {adultQuantity === 1 ? "person" : "people"}
                </p>
                <span className="font-semibold">
                  {formatPrice(adultUnitPrice * adultQuantity)}
                </span>
              </div>

              <div className="flex justify-between border-b border-stone-200 py-2">
                <p className="text-stone-400 text-sm">
                  <p className="font-bold text-stone-900">Child</p>
                  {formatPrice(childUnitPrice)} × {childQuantity}{" "}
                  {adultQuantity === 1 ? "person" : "people"}
                </p>
                <span className="font-semibold">
                  {formatPrice(adultUnitPrice * adultQuantity)}
                </span>
              </div>

              {selectedHotel && (
                <div className="flex justify-between border-b border-stone-300 py-2">
                  <p className=" flex flex-col ">
                    <span className="text-stone-900 font-bold">
                      Accommodation
                    </span>

                    <span className="text-stone-600 ">
                      {selectedHotel.hotel}
                    </span>

                    <span className="text-stone-400 font-thin">
                      {"⭐".repeat(selectedHotel.stars)} • {selectedHotel.room}
                    </span>
                  </p>

                  <span className="font-semibold">
                    {formatPrice(selectedHotel.price)}
                  </span>
                </div>
              )}

              {/* Extra Services */}
              {selectedExtras.length > 0 && (
                <div className="border-b border-stone-300 pb-3">
                  <p className="text-stone-900 font-bold mb-2">
                    Extra Services
                  </p>
                  {selectedExtras.map((extra) => (
                    <div
                      key={extra.id}
                      className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-stone-600 text-sm">{extra.title}</p>
                      </div>
                      <p className="text-stone-900 font-bold text-sm">
                        {formatPrice(extra.price)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between mt-2 pt-2 border-t border-stone-300">
                    <span className="text-stone-800 font-bold">
                      Extras Total
                    </span>
                    <span className="text-stone-900 font-bold">
                      {formatPrice(extrasTotal)}
                    </span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-2 border-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-2 border-t border-stone-300 mt-2 text-stone-900 font-bold text-2xl">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {startDate && (
              <div className="mt-40 p-4 bg-sky-100 border border-cyan-500/30 rounded-lg">
                <p className="font-medium text-sky-700 text-sm">
                  📅 Tour Start Date:
                  {startDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
