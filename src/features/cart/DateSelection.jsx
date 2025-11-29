// src/components/DateSelection.js

import DatePicker from "react-datepicker";
import Button from "../../ui/Button";

function DateSelection({ onClose, startDate, setStartDate, index, setIndex }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-600 rounded-2xl px-5 text-white shadow-xl shadow-slate-900/50 transition-all duration-500">
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

      <a
        className="flex justify-center mt-8 gap-4 cursor-pointer"
        onClick={() => onClose(false)}>
        Close
      </a>
      <div className=" flex justify-between items-center mt-5 mb-3">
        <Button
          type="glass"
          size="sm"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}>
          Back
        </Button>
        {startDate && (
          <Button type="glass" size="sm" onClick={() => setIndex(index + 1)}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export default DateSelection;
