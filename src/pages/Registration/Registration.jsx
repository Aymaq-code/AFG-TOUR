// Registration.jsx (updated)
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializePrices,
  selectHotel,
  toggleExtraService,
  setTourDate,
} from "../../features/cart/cartSlice";

import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../../features/cart/ProgressBar";
import DateSelection from "../../features/cart/DateSelection";
import PersonSelection from "../../features/cart/PersonSelection";
import Accommodation from "../../features/cart/Accommodation";
import ExtraServices from "../../features/cart/ExtraServices";
import ResultsSidebar from "../../features/cart/ResultsSidebar";

export default function Registration({
  onClose,
  name,
  adultPrice,
  childPrice,
  accommodation,
  extra__services,
}) {
  const dispatch = useDispatch();
  const { conversionRate } = useSelector((state) => state.currency);

  const [startDate, setStartDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [index, setIndex] = useState(0);

  // Convert prices when currency changes
  const convertedAdultPrice = adultPrice * conversionRate;
  const convertedChildPrice = childPrice * conversionRate;
  const convertedAccommodation = accommodation?.map((hotel) => ({
    ...hotel,
    price: hotel.price * conversionRate,
  }));
  const convertedServices = extra__services?.map((service) => ({
    ...service,
    price: service.price * conversionRate,
  }));

  useEffect(() => {
    dispatch(
      initializePrices({
        adultPrice: convertedAdultPrice,
        childPrice: convertedChildPrice,
      })
    );
  }, [dispatch, adultPrice, childPrice, conversionRate]);

  const handleDateChange = (date) => {
    setStartDate(date);
    dispatch(setTourDate(date));
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    dispatch(selectHotel(hotel));
  };

  const handleServiceToggle = (service) => {
    const exists = selectedServices.find((s) => s.id === service.id);
    const updated = exists
      ? selectedServices.filter((s) => s.id !== service.id)
      : [...selectedServices, service];
    setSelectedServices(updated);
    dispatch(toggleExtraService(service));
  };

  const sections = [
    {
      id: 1,
      section: (
        <DateSelection
          onClose={onClose}
          startDate={startDate}
          setStartDate={handleDateChange}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 2,
      section: (
        <PersonSelection
          adultPrice={convertedAdultPrice}
          childPrice={convertedChildPrice}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 3,
      section: (
        <Accommodation
          accommodation={convertedAccommodation}
          selectedHotel={selectedHotel}
          onHotelSelect={handleHotelSelect}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 4,
      section: (
        <ExtraServices
          extra__services={convertedServices}
          selectedServices={selectedServices}
          onSelectServices={handleServiceToggle}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
  ];

  return (
    <div className="bg-black/80 w-full h-full md:h-[100vh] fixed top-0 left-0 z-20 md:py-5 overflow-y-auto ">
      <div className="flex flex-col md:flex-row bg-white md:p-4 max-w-[80rem] mx-auto md:rounded-2xl shadow-xl mt-4 gap-4">
        <div className="bg-stone-100 p-4 rounded-xl w-full md:w-[65%]">
          <div className="shadow-sm shadow-stone-400 rounded-full">
            <ProgressBar
              startDate={startDate}
              adultPrice={convertedAdultPrice}
              selectedHotel={selectedHotel}
              selectedServices={selectedServices}
              index={index}
            />
          </div>
          <div className="mt-4 md:p-4">{sections[index].section}</div>
        </div>
        <div className="bg-stone-100 p-4 rounded-xl w-full md:w-[35%] md:sticky md:top-4">
          <ResultsSidebar
            name={name}
            startDate={startDate}
            selectedHotel={selectedHotel}
            selectedServices={selectedServices}
            adultPrice={convertedAdultPrice}
            childPrice={convertedChildPrice}
          />
        </div>
      </div>
    </div>
  );
}
