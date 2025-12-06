import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "../../store/registrationStore";
import { createBooking, validateCoupon } from "../../services/apiTour";
import Button from "../../components/common/Button";
import Header from "../../components/layout/Header";
import { PAYMENT_METHODS } from "../../utils/constants";
import { formatCurrency } from "../../utils/formatters";

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
  const applyCoupon = useRegistrationStore((s) => s.applyCoupon);
  const reset = useRegistrationStore((s) => s.reset);

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    couponCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  // Calculate totals
  const personsTotal =
    adultUnitPrice * adultQuantity + childUnitPrice * childQuantity;
  const hotelTotal = selectedHotel ? selectedHotel.price : 0;
  const extrasTotal = selectedExtras.reduce(
    (sum, extra) => sum + extra.price,
    0
  );
  const subtotal = getSubtotal();
  const total = getTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }

    if (name === "expiryDate") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    try {
      const result = await validateCoupon(formData.couponCode, subtotal);
      setCouponMessage(result.message);

      if (result.valid) {
        applyCoupon(result.code, (subtotal * result.discount) / 100);
        setFormData((prev) => ({ ...prev, couponCode: "" })); // Clear input
      }
    } catch {
      setCouponMessage("Error applying coupon. Please try again.");
    }
  };

  const validateForm = () => {
    if (paymentMethod === "credit") {
      if (!formData.cardHolder.trim()) return "Card holder name is required";
      if (!formData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/))
        return "Valid card number is required";
      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/))
        return "Valid expiry date is required";
      if (!formData.cvv.match(/^\d{3,4}$/)) return "Valid CVV is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsProcessing(true);

    try {
      const bookingData = {
        tour: {
          persons: [
            { id: "adult", unitPrice: adultUnitPrice, quantity: adultQuantity },
            { id: "child", unitPrice: childUnitPrice, quantity: childQuantity },
          ],
          selectedHotel,
          selectedExtras,
          pricing: {
            personsTotal,
            hotelTotal,
            extrasTotal,
            subtotal,
            discount,
            total,
          },
        },
        payment: {
          method: paymentMethod,
          details: paymentMethod === "credit" ? formData : {},
          couponCode,
        },
        startDate,
      };

      const booking = await createBooking(bookingData);

      reset(); // Reset the store

      navigate("/confirmation", {
        state: {
          bookingId: booking.id,
          referenceNumber: booking.referenceNumber,
          totalPrice: total,
          tourName: "Tour Package",
          bookingDate: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full border rounded-lg px-4 py-3 border-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border rounded-lg px-4 py-3 border-stone-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full border rounded-lg px-4 py-3 border-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
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
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    placeholder="Enter coupon code"
                    className="flex-1 border rounded-lg px-4 py-3 border-stone-400"
                  />
                  <Button
                    type="secondary"
                    size="md"
                    onClick={handleApplyCoupon}
                    disabled={!formData.couponCode.trim()}>
                    Apply
                  </Button>
                </div>
                {couponMessage && (
                  <p className="mt-2 text-sm">{couponMessage}</p>
                )}
              </div>

              <Button
                type="tertiary"
                size="xl"
                disabled={isProcessing}
                onClick={handleSubmit}>
                {isProcessing
                  ? "Processing Payment..."
                  : `Pay ${formatCurrency(total)}`}
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
          <div className="bg-white rounded-2xl p-8 border shadow-lg border border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-stone-200 py-2 ">
                <p className="text-stone-400 text-sm">
                  <p className="font-bold text-stone-900">Adult</p>
                  {formatCurrency(adultUnitPrice)} × {adultQuantity}{" "}
                  {adultQuantity === 1 ? "person" : "people"}
                </p>
                <span className="font-semibold">
                  {formatCurrency(adultUnitPrice * adultQuantity)}
                </span>
              </div>

              <div className="flex justify-between border-b border-stone-200 py-2">
                <p className="text-stone-400 text-sm">
                  <p className="font-bold text-stone-900">Child</p>
                  {formatCurrency(childUnitPrice)} × {childQuantity}{" "}
                  {adultQuantity === 1 ? "person" : "people"}
                </p>
                <span className="font-semibold">
                  {formatCurrency(adultUnitPrice * adultQuantity)}
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
                    {formatCurrency(selectedHotel.price)}
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
                        {formatCurrency(extra.price)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between mt-2 pt-2 border-t border-stone-300">
                    <span className="text-stone-800 font-bold">
                      Extras Total
                    </span>
                    <span className="text-stone-900 font-bold">
                      {formatCurrency(extrasTotal)}
                    </span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-2 border-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-2 border-t border-stone-300 mt-2 text-stone-900 font-bold text-2xl">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
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
