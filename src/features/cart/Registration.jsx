// src/features/cart/Registration.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializePrices } from "../cart/cartSlice";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../cart/ProgressBar";
import DateSelection from "../cart/DateSelection";
import PersonSelection from "../cart/PersonSelection";
import Accommodation from "../cart/Accommodation";
import ExtraServices from "../cart/ExtraServices";
import ResultsSidebar from "../cart/ResultsSidebar";

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
  const [selectedServices, setSelectedServices] = useState([]);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePrices({ adultPrice, childPrice }));
  }, [dispatch, adultPrice, childPrice]);
  const sections = [
    {
      id: 1,
      section: (
        <DateSelection
          onClose={onClose}
          startDate={startDate}
          setStartDate={setStartDate}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 2,
      section: (
        <PersonSelection
          adultPrice={adultPrice}
          childPrice={childPrice}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 3,
      section: (
        <Accommodation
          accommodation={accommodation}
          selectedHotel={selectedHotel}
          onHotelSelect={setSelectedHotel}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
    {
      id: 4,
      section: (
        <ExtraServices
          extra__services={extra__services}
          selectedServices={selectedServices}
          onSelectServices={setSelectedServices}
          index={index}
          setIndex={setIndex}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#000000ca] fixed top-0 left-0 z-50 w-full h-[100vh] flex items-center justify-center">
      <div className="h-full flex flex-col lg:flex-row gap-10 lg:gap-6 bg-white rounded-2xl w-full max-w-6xl mx-auto p-6 shadow-2xl">
        <div className="w-full overflow-y-scroll ">
          <ProgressBar
            startDate={startDate}
            adultPrice={adultPrice}
            selectedHotel={selectedHotel}
            selectedServices={selectedServices}
            index={index}
          />

          <div className="border-2 border-gray-200 rounded-2xl p-6 overflow-y-scroll">
            {sections[index].section}
          </div>
        </div>

        <div className=" overflow-y-scroll">
          <ResultsSidebar
            name={name}
            startDate={startDate}
            selectedHotel={selectedHotel}
            selectedServices={selectedServices}
            adultPrice={adultPrice}
            childPrice={childPrice}
          />
        </div>
      </div>
    </div>
  );
}
