import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, initializePrices } from "../cart_vs1/cartSlice";

export default function Registration({
  onClose,
  name,
  adultPrice,
  childPrice,
  accommodation,
  extra__services,
}) {
  const [startDate, setStartDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const adult = useSelector((state) =>
    state.cart.items.find((i) => i.id === "adult")
  );
  const child = useSelector((state) =>
    state.cart.items.find((i) => i.id === "child")
  );
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  // Initialize prices when component mounts
  useEffect(() => {
    dispatch(initializePrices({ adultPrice, childPrice }));
  }, [dispatch, adultPrice, childPrice]);

  // Calculate individual fares
  const adultTotalFare = adult ? adult.unitPrice * adult.quantity : 0;
  const childTotalFare = child ? child.unitPrice * child.quantity : 0;

  // Calculate total price including hotel
  const totalPriceWithHotel =
    totalPrice + (selectedHotel ? selectedHotel.price : 0);

  const handleHotelSelection = (hotel) => {
    setSelectedHotel(hotel);
    alert(
      `${hotel.stars} star hotel selected: ${hotel.hotel}\nPrice: USD ${
        hotel.price
      }.00\nTotal Price: USD ${totalPrice + hotel.price}.00`
    );
  };

  return (
    <div className="bg-[#000000ca] fixed top-0 left-0 z-50 w-full h-[100vh] flex items-center justify-center ">
      <div className="h-full flex flex-col lg:flex-row gap-6 bg-white rounded-2xl w-full max-w-6xl mx-auto p-6 shadow-2xl">
        <div className="w-full lg:w-[70%] overflow-x-scroll">
          {/* Progress Bar */}
          <div className="sticky top-0 z-20">
            <div className="flex justify-between items-center bg-gray-100 rounded-full p-2 mb-6">
              {["Date", "Package type", "Accommodation", "Extra services"].map(
                (step, index) => {
                  let isActive = false;

                  if (index === 0) isActive = true;

                  return (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
              ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}>
                        {index + 1}
                      </div>

                      <span
                        className={`ml-2 text-sm font-medium hidden sm:block transition-all duration-300
              ${isActive ? "text-cyan-600" : "text-gray-500"}`}>
                        {step}
                      </span>

                      {index < 3 && (
                        <div className="w-4 sm:w-8 h-0.5 bg-gray-300 mx-2" />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-2xl p-6 overflow-x-scroll ">
            {/* Select Date Section */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-600 rounded-2xl p-8 text-white shadow-xl shadow-slate-900/50 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
                Select your tour start date
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Choose when your adventure begins
              </p>

              <div className="flex justify-center mb-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  placeholderText="Click to choose your start date"
                  className="w-full max-w-md text-center py-4 px-6 rounded-xl bg-white text-slate-800 font-semibold outline-none border-2 border-slate-300 hover:border-cyan-400 focus:border-cyan-500 transition-all duration-300 cursor-pointer shadow-lg"
                />
              </div>

              {startDate && (
                <p className="text-center text-cyan-300 font-medium mt-4">
                  Selected:{" "}
                  {startDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              <div className="flex justify-center mt-8 gap-4">
                <Button
                  onClick={() => alert(`Selected Date: ${startDate}`)}
                  disabled={!startDate}
                  className={`px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 ${
                    startDate
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-cyan-500/40 transform hover:scale-105"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}>
                  Continue
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => onClose(false)}
                  className="px-8 py-3 rounded-xl text-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-all duration-300 border border-slate-600 hover:border-slate-500 cursor-pointer">
                  Cancel
                </Button>
              </div>
            </div>

            {/* Person Selection */}
            <div className="mt-6 space-y-6">
              <div className="bg-gray-100 rounded-xl p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
                  Persons Selection
                </h3>

                <div className=" mt-10 flex flex-col gap-4">
                  {/* Adult selection */}
                  <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
                    <div>
                      <p className="text-stone-50">Adult</p>
                      <p className="text-stone-300">Minimum: 1</p>
                    </div>

                    <div>
                      <p className="text-stone-50">
                        USD <span className="font-semibold">{adultPrice}</span>
                      </p>
                      <p className="text-stone-300">/Person</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        type="small"
                        onClick={() =>
                          adult.quantity > 1 &&
                          dispatch(
                            updateQuantity({
                              id: "adult",
                              quantity: adult.quantity - 1,
                            })
                          )
                        }>
                        -
                      </Button>

                      <span className="font-semibold text-stone-100">
                        {adult.quantity}
                      </span>

                      <Button
                        type="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: "adult",
                              quantity: adult.quantity + 1,
                            })
                          )
                        }>
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Child selection */}
                  <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
                    <div>
                      <p className="text-stone-50">Child</p>
                      <p className="text-stone-300">Minimum: 0</p>
                    </div>

                    <div>
                      <p className="text-stone-50">
                        USD <span className="font-semibold">{childPrice}</span>
                      </p>
                      <p className="text-stone-300">/Person</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        type="small"
                        onClick={() =>
                          child.quantity > 0 &&
                          dispatch(
                            updateQuantity({
                              id: "child",
                              quantity: child.quantity - 1,
                            })
                          )
                        }>
                        -
                      </Button>

                      <span className="font-semibold text-stone-100">
                        {child.quantity}
                      </span>

                      <Button
                        type="small"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: "child",
                              quantity: child.quantity + 1,
                            })
                          )
                        }>
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accommodation */}
            <div className="mt-6 space-y-6">
              <div className="bg-gray-100 rounded-xl p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
                    Accomodation
                  </h3>
                  <h3 className="text-stone-200">
                    Select the accommodation for the trip.
                  </h3>
                </div>
                {accommodation.map((item, index) => (
                  <div
                    onClick={() => handleHotelSelection(item)}
                    key={index}
                    className={`bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md mt-2 cursor-pointer hover:bg-white/30 transition-all duration-300 ${
                      selectedHotel?.hotel === item.hotel
                        ? "ring-2 ring-cyan-400"
                        : ""
                    }`}>
                    <h3 className="text-stone-100 font-semibold flex flex-col gap-1 w-[45%]">
                      <span>{item.hotel}</span>
                      <span>{"⭐".repeat(item.stars)}</span>
                    </h3>

                    <p className="text-stone-300 text-sm">{item.room}</p>

                    <p className="text-stone-100 text-sm font-semibold">
                      Price: USD {item.price}.00
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Services */}
            <div className="mt-6 space-y-6">
              <div className="bg-gray-100 rounded-xl p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
                    Extra Services
                  </h3>
                  <h3 className="text-stone-200">
                    Upgrade your experience with optional add-ons.
                  </h3>
                </div>

                {extra__services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/20 backdrop-blur-md flex justify-between items-center p-3 rounded-md mt-2 cursor-pointer hover:bg-white/30 transition-all duration-300">
                    <div className="text-left">
                      <h3 className="text-stone-100 font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-stone-300 text-sm">
                        {service.description}
                      </p>
                    </div>
                    <p className="text-stone-100 font-semibold">
                      USD {service.price}.00
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="w-full lg:w-[30%] py-5">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 text-white h-full border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              Booking Summary
            </h3>

            <h2 className="text-2xl">{name}</h2>

            <div className="space-y-4 mt-5">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400">Start Date</p>
                <p className="font-semibold">
                  {startDate ? startDate.toLocaleDateString() : "Not selected"}
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400 mb-2">Travellers</p>

                {/* Adult fare */}
                <div className="flex justify-between mb-1">
                  <p>
                    Adult x {adult.quantity} @ USD{adultPrice}
                  </p>
                  <p>USD {adultTotalFare}</p>
                </div>

                {/* Child fare */}
                <div className="flex justify-between mb-1">
                  <p>
                    Child x {child.quantity} @ USD{childPrice}
                  </p>
                  <p>USD {childTotalFare}</p>
                </div>

                {/* Total travellers */}
                <div className="border-t border-slate-600 pt-1 mt-2">
                  <div className="flex justify-between font-semibold">
                    <p>Total Persons:</p>
                    <p>{adult.quantity + child.quantity}</p>
                  </div>
                </div>
              </div>

              {/* Selected Hotel */}
              {selectedHotel && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 mb-2">Selected Hotel</p>
                  <div className="flex justify-between mb-1">
                    <p>{selectedHotel.hotel}</p>
                    <p>USD {selectedHotel.price}.00</p>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <p>{selectedHotel.stars} stars</p>
                    <p>{selectedHotel.room}</p>
                  </div>
                </div>
              )}

              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-400">Total Price</p>
                <p className="text-2xl font-bold text-cyan-400">
                  USD {totalPriceWithHotel}
                </p>
              </div>
            </div>

            <Button type={"secondary"} className="w-full mt-4">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
