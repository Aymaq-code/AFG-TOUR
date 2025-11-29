import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../ui/Header";

import { clearCart, applyCoupon } from "../cart/cartSlice";
import { createBooking, validateCoupon } from "../../services/apiTour";
import Button from "../../ui/Button";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { items, person, discount, couponCode } = useSelector(
    (state) => state.cart
  );
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

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
  const totalPrice = subtotal * person - discount;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplyCoupon = async () => {
    if (!formData.couponCode.trim()) return;

    try {
      const result = await validateCoupon(formData.couponCode);
      setCouponMessage(result.message);

      if (result.valid) {
        dispatch(
          applyCoupon({
            code: formData.couponCode.toUpperCase(),
            discount: result.discount,
          })
        );
      }
    } catch (error) {
      setCouponMessage("Error applying coupon");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // شبیه‌سازی پرداخت
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ایجاد رزرو
      await createBooking({
        items,
        person,
        totalPrice,
        discount,
        couponCode,
        paymentMethod,
        user: { username, email },
        paymentDetails: formData,
      });

      // پاک کردن سبد خرید
      dispatch(clearCart());

      // هدایت به صفحه تأیید
      navigate("/confirmation", {
        state: {
          bookingId: `BK${Date.now()}`,
          totalPrice,
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
    <div className="min-h-screen payment">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Payment Form */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors mr-4">
                  ← Back
                </button>
                <h1 className="text-3xl font-bold text-white">Payment</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <h3 className="text-white font-semibold mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: "credit",
                        label: "💳 Credit/Debit Card",
                        default: true,
                      },
                      { id: "paypal", label: "💸 PayPal" },
                      { id: "crypto", label: "₿ Cryptocurrency" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center justify-between p-4 bg-black/30 rounded-lg cursor-pointer hover:bg-black/40 transition-colors">
                        <span className="text-white font-medium">
                          {method.label}
                        </span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-cyan-500"
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
                        placeholder="Enter full name"
                        className="w-full bg-black/30 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
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
                        maxLength="19"
                        className="w-full bg-black/30 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                          maxLength="5"
                          className="w-full bg-black/30 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
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
                          maxLength="3"
                          className="w-full bg-black/30 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Coupon Code */}
                <div>
                  <label className="block text-stone-300 mb-2">
                    Discount Coupon (optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleInputChange}
                      placeholder="Enter coupon code"
                      className="flex-1 bg-black/30 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                    <Button
                      type="glass"
                      size="md"
                      className="whitespace-nowrap"
                      onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`mt-2 text-sm ${
                        couponMessage.includes("applied")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="glass" size="xl" disabled={isProcessing}>
                  {isProcessing
                    ? "Processing..."
                    : `Pay $${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-black/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-stone-600">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-stone-400 text-sm">
                        ${item.unitPrice} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-white font-semibold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-6 pt-6 border-t border-stone-600">
                <div className="flex justify-between text-stone-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Persons</span>
                  <span>×{person}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-stone-600">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  🔐 Your payment information is secure and encrypted. We use
                  industry-standard SSL encryption to protect your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
