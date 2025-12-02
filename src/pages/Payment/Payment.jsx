import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { applyCoupon, clearCart } from "../../features/cart/cartSlice";
import { createBooking, validateCoupon } from "../../services/apiTour";
import Button from "../../components/common/Button";
import Header from "../../components/layout/Header";
import { PAYMENT_METHODS } from "../../utils/constants"; // Import the constant
import { formatCurrency, formatDate } from "../../utils/formatters"; // Import formatters

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get complete cart state including hotel and extras
  const {
    items,
    selectedHotel,
    selectedExtras,
    selectedDate,
    discount,
    couponCode,
    totalPrice,
  } = useSelector((state) => state.cart);

  const { username, email } = useSelector((state) => state.user);

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

  // Calculate individual totals for display
  const personsTotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
  const hotelTotal = selectedHotel ? selectedHotel.price : 0;
  const extrasTotal = selectedExtras.reduce(
    (total, extra) => total + extra.price,
    0
  );
  const subtotal = personsTotal + hotelTotal + extrasTotal;

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      return;
    }

    // Format expiry date
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

  /**
   * Validate and apply coupon code
   */
  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    try {
      const result = await validateCoupon(formData.couponCode, subtotal);
      setCouponMessage(result.message);

      if (result.valid) {
        dispatch(
          applyCoupon({
            code: result.code,
            discount: (subtotal * result.discount) / 100,
          })
        );
      }
    } catch {
      setCouponMessage("Error applying coupon. Please try again.");
    }
  };

  /**
   * Validate payment form
   */
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

  /**
   * Handle payment submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsProcessing(true);

    try {
      // Create booking data with all details
      const bookingData = {
        tour: {
          persons: items,
          selectedHotel,
          selectedExtras,
          selectedDate,
          pricing: {
            personsTotal,
            hotelTotal,
            extrasTotal,
            subtotal,
            discount,
            totalPrice,
          },
        },
        payment: {
          method: paymentMethod,
          details: paymentMethod === "credit" ? formData : {},
          couponCode: couponCode || undefined,
        },
        customer: {
          username,
          email,
          bookingDate: new Date().toISOString(),
        },
      };

      // Process booking
      const booking = await createBooking(bookingData);

      // Clear cart
      dispatch(clearCart());

      // Navigate to confirmation
      navigate("/confirmation", {
        state: {
          bookingId: booking.id,
          referenceNumber: booking.referenceNumber,
          totalPrice: bookingData.tour.pricing.totalPrice,
          tourName: "Tour Package",
          customerName: username,
          bookingDate: booking.bookingDate,
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
    <div className=" payment min-h-screen bg-gradient-to-br bg-linear-to-r from-cyan-600 to-blue-700 ">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8 flex-col md:flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mr-6 cursor-pointer ">
              <span className="text-2xl mr-2">←</span>
              Back to Booking
            </button>
            <h1 className="text-4xl font-bold text-white">
              Complete Your Booking
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Payment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method Selection - UPDATED WITH CONSTANTS */}
                <div>
                  <h3 className="text-white font-semibold mb-4">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 border-2
                          ${
                            paymentMethod === method.id
                              ? "bg-cyan-500/20 border-cyan-400"
                              : "bg-black/30 border-stone-200 hover:border-stone-500"
                          }`}>
                        <div className="flex items-center">
                          <span className="text-2xl mr-3 text-amber-300">
                            {method.icon}
                          </span>
                          <div className="text-left">
                            <span className="text-white font-medium">
                              {method.label}
                            </span>
                            <p className="text-stone-400 text-sm mt-1">
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
                          className="w-5 h-5 text-cyan-500 focus:ring-cyan-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === "credit" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-stone-300 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-black/30 border border-stone-200 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-stone-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-black/30 border border-stone-200 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="flex justify-between flex-col md:flex-row gap-3">
                      <div>
                        <label className="block text-stone-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full bg-black/30 border border-stone-200 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full bg-black/30 border border-stone-200 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Notice (if selected) */}
                {paymentMethod === "paypal" && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-400">
                      You will be redirected to PayPal to complete your payment
                      securely.
                    </p>
                  </div>
                )}

                {/* Cryptocurrency Notice (if selected) */}
                {paymentMethod === "crypto" && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400">
                      After clicking "Pay", you will receive cryptocurrency
                      payment instructions.
                    </p>
                  </div>
                )}

                {/* Coupon Code */}
                <div>
                  <label className="block text-stone-300 mb-2">
                    Discount Coupon {discount > 0 && `(Applied: ${couponCode})`}
                  </label>
                  <div className="flex gap-2 flex-col md:flex-row ">
                    <input
                      type="text"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      placeholder="Enter coupon code"
                      className="flex-1 bg-black/30 border border-stone-200 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    <Button
                      type="glass"
                      size="md"
                      onClick={handleApplyCoupon}
                      disabled={!formData.couponCode.trim()}>
                      Apply
                    </Button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`mt-2 text-sm ${
                        couponMessage.includes("applied") ||
                        couponMessage.includes("discount")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Submit Button - UPDATED WITH FORMAT CURRENCY */}
                <Button
                  type="glass"
                  size="xl"
                  className="w-full"
                  disabled={isProcessing}>
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ${formatCurrency(totalPrice)}`
                  )}
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
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Travelers - UPDATED WITH FORMAT CURRENCY */}
                {items.map(
                  (item) =>
                    item.quantity > 0 && (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-white/20">
                        <div>
                          <p className="text-white font-medium capitalize">
                            {item.id}
                          </p>
                          <p className="text-stone-400 text-sm">
                            {formatCurrency(item.unitPrice)} × {item.quantity}{" "}
                            {item.quantity === 1 ? "person" : "people"}
                          </p>
                        </div>
                        <p className="text-white font-semibold">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    )
                )}

                {/* Hotel */}
                {selectedHotel && (
                  <div className="flex justify-between items-center py-3 border-b border-white/20">
                    <div>
                      <p className="text-white font-medium">Accommodation</p>
                      <p className="text-stone-400 text-sm">
                        {selectedHotel.hotel}
                      </p>
                      <p className="text-stone-400 text-sm">
                        {"⭐".repeat(selectedHotel.stars)} •{" "}
                        {selectedHotel.room}
                      </p>
                    </div>
                    <p className="text-white font-semibold">
                      {formatCurrency(selectedHotel.price)}
                    </p>
                  </div>
                )}

                {/* Extra Services */}
                {selectedExtras.length > 0 && (
                  <div className="border-b border-white/20 pb-3">
                    <p className="text-white font-medium mb-2">
                      Extra Services
                    </p>
                    {selectedExtras.map((extra) => (
                      <div
                        key={extra.id}
                        className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-white text-sm">{extra.title}</p>
                        </div>
                        <p className="text-white text-sm">
                          {formatCurrency(extra.price)}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between mt-2 pt-2 border-t border-white/20">
                      <span className="text-stone-400 text-sm">
                        Extras Total
                      </span>
                      <span className="text-white font-semibold">
                        {formatCurrency(extrasTotal)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown - UPDATED WITH FORMAT CURRENCY */}
              <div className="space-y-2 mt-6 pt-6 border-t border-white/20">
                <div className="flex justify-between text-stone-300">
                  <span>Persons Total</span>
                  <span>{formatCurrency(personsTotal)}</span>
                </div>
                {selectedHotel && (
                  <div className="flex justify-between text-stone-300">
                    <span>Accommodation</span>
                    <span>{formatCurrency(hotelTotal)}</span>
                  </div>
                )}
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between text-stone-300">
                    <span>Extra Services</span>
                    <span>{formatCurrency(extrasTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-300 border-t border-white/20 pt-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({couponCode})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className=" flex justify-between text-xl font-bold text-white pt-2 border-t border-white/20">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Tour Date - UPDATED WITH FORMAT DATE */}
              {selectedDate && (
                <div className=" mt-40 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-cyan-400 text-sm">
                    📅 Tour Start Date: {formatDate(selectedDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
