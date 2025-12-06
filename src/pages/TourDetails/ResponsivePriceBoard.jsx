import Button from "../../components/common/Button";
import { formatPrice } from "../../utils/formatters";

export default function ResponsivePriceBoard({
  selectedCurrencyState,
  handleCurrencyChange,
  adultPrice,
  childPrice,
  setShowRegistration,
}) {
  const changeCurrency = (value) => {
    handleCurrencyChange({
      target: { value },
    });
  };

  return (
    <div className="bg-[#424242] z-20 lg:hidden md:flex flex-col justify-center items-center fixed bottom-0 w-full shadow-black shadow-[0_5px_7px_5px] px-4 ">
      {/*Currencies and prices*/}
      <div className=" w-full flex justify-center mt-5 md:mt-1 md:justify-between items-center flex-wrap mb-2">
        {/* Currency Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => changeCurrency("USD")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              selectedCurrencyState === "USD"
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}>
            USD ($)
          </Button>

          <Button
            onClick={() => changeCurrency("EUR")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              selectedCurrencyState === "EUR"
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}>
            EUR (€)
          </Button>

          <Button
            onClick={() => changeCurrency("AED")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              selectedCurrencyState === "AED"
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}>
            AED (د.إ)
          </Button>
        </div>

        {/* Prices */}
        <div className=" flex justify-center items-center gap-x-4 ">
          <div className=" text-center flex gap-2 items-center  ">
            <p className="text-[17px] text-stone-300 ">From</p>
            <p className="font-semibold text-xl text-white">
              {formatPrice(adultPrice)}
            </p>
            <p className="text-[17px] text-stone-300">/Adult</p>
          </div>

          <div className="w-[50%] text-center py-4 flex gap-2 items-center ">
            <p className="text-[17px] text-stone-300">From</p>
            <p className="font-semibold text-xl text-white">
              {formatPrice(childPrice)}
            </p>
            <p className="text-[17px] text-stone-300">/Child</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className=" py-1 md:py-2 text-center mb-2 w-full">
        <Button
          type="tertiary"
          className="w-full border-stone-400 border"
          size="lg"
          onClick={() => setShowRegistration(true)}>
          Check availability
        </Button>
      </div>
    </div>
  );
}
