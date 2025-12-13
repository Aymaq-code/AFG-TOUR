import React, { useEffect } from "react";
import { useRegistrationStore } from "../../store/registrationStore";
import ProgressBar from "../../features/cart/ProgressBar";
import DateSelection from "../../features/cart/DateSelection";
import PersonSelection from "../../features/cart/PersonSelection";
import Accommodation from "../../features/cart/Accommodation";
import ExtraServices from "../../features/cart/ExtraServices";
import ResultsSidebar from "../../features/cart/ResultsSidebar";
import Button from "../../components/common/Button";

export default function Registration({
  onClose,
  name,
  adultPrice,
  childPrice,
  accommodation,
  extra__services,
  conversionRate = 1,
}) {
  const setOnClose = useRegistrationStore((s) => s.setOnClose);
  const index = useRegistrationStore((s) => s.index);
  const setUnitPrices = useRegistrationStore((s) => s.setUnitPrices);
  const startDate = useRegistrationStore((s) => s.startDate);
  const adultUnitPrice = useRegistrationStore((s) => s.adultUnitPrice);
  const selectedHotel = useRegistrationStore((s) => s.selectedHotel);
  const selectedServices = useRegistrationStore((s) => s.selectedServices);

  useEffect(() => {
    // expose the parent onClose to the store so children can call close()
    setOnClose(() => onClose);

    // convert prices using conversionRate and set them in Zustand
    const convertedAdult = adultPrice * conversionRate;
    const convertedChild = childPrice * conversionRate;
    setUnitPrices({ adult: convertedAdult, child: convertedChild });

    // cleanup on unmount
    return () => {
      setOnClose(null);
    };
  }, [
    adultPrice,
    childPrice,
    conversionRate,
    onClose,
    setOnClose,
    setUnitPrices,
  ]);

  const sections = [
    { id: 0, component: <DateSelection /> },
    { id: 1, component: <PersonSelection /> },
    { id: 2, component: <Accommodation accommodation={accommodation} /> },
    { id: 3, component: <ExtraServices extra__services={extra__services} /> },
  ];

  return (
    <div className="bg-black/80 w-full h-full md:h-[100vh] fixed top-0 left-0 z-[1000] md:py-5 overflow-y-auto">
      <Button
        type="tertiary"
        className="absolute xl:right-4 lg:top-2 2xl:top-1 right-4 top-1  "
        size="sm"
        onClick={() => onClose(false)}>
        <span className="text-3xl font-semibold mb-1"> &times;</span>
      </Button>
      <div className="flex flex-col lg:flex-row bg-white md:p-4 max-w-[80rem] mx-auto md:rounded-2xl  mt-15 lg:mt-4 gap-4">
        <div className="bg-stone-100 p-4 rounded-xl w-full lg:w-[65%] shadow-xl shadow-stone-400">
          <div className="crounded-full">
            <ProgressBar
              startDate={startDate}
              adultPrice={adultUnitPrice}
              selectedHotel={selectedHotel}
              selectedServices={selectedServices}
              index={index}
            />
          </div>

          <div className="mt-4 md:p-4">{sections[index].component}</div>
        </div>

        <div className="  p-4 rounded-xl w-full lg:w-[35%] md:sticky md:top-4 md:rounded-2xl shadow-xl shadow-stone-400 bg-stone-100 ">
          <ResultsSidebar name={name} />
        </div>
      </div>
    </div>
  );
}
