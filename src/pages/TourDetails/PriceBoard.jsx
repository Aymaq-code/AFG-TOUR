import { formatPrice } from "../../utils/formatters";
import Button from "../../components/common/Button";

export default function PriceBoard({
  selectedCurrencyState,
  handleCurrencyChange,
  adultPrice,
  childPrice,
  setShowRegistration,
  showNavbar,
}) {
  return (
    <div
      className={`hidden lg:sticky z-10 mt-10 left-[65rem] w-full lg:w-[30%] 
  rounded-2xl overflow-hidden lg:flex md:flex-col md:justify-between 
  md:gap-4 shadow-black/40 shadow-[0_2px_4px] TourFullDetails 
  border-stone-300 border self-start 
  ${showNavbar ? "top-25" : "top-10"}`}>
      <select
        className="outline-none border-b-[1px] border-stone-300 bg-[#757575] text-white p-2 w-full rounded-none py-3 font-semibold text-[25px] cursor-pointer"
        value={selectedCurrencyState}
        onChange={handleCurrencyChange}>
        <option className="bg-[#78909C] " value="USD">
          USD ($)
        </option>
        <option className="bg-[#78909C]" value="EUR">
          EUR (€)
        </option>
        <option className="bg-[#78909C]" value="AED">
          AED (د.إ)
        </option>
      </select>

      <div className="flex justify-between border-b-[1px] border-stone-400">
        <div className="w-[50%] text-center flex flex-col gap-2 border-r border-stone-400 mb-5 mt-5">
          <p className="text-[20px] text-stone-500">From</p>
          <p className="font-semibold text-3xl text-stone-700">
            {formatPrice(adultPrice)}
          </p>
          <p className="text-stone-500 text-[20px]">/Adult</p>
        </div>

        <div className="w-[50%] text-center py-4 flex flex-col gap-2.5">
          <p className="text-[20px] text-stone-500">From</p>
          <p className="font-semibold text-3xl text-stone-700 ">
            {formatPrice(childPrice)}
          </p>
          <p className="text-stone-500 text-[20px]">/Child</p>
        </div>
      </div>

      <div className="py-2 text-center mb-3">
        <Button
          type="tertiary"
          size="lg"
          onClick={() => setShowRegistration(true)}>
          Check availability
        </Button>
      </div>
    </div>
  );
}
