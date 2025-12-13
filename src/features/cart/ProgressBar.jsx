function ProgressBar({ index }) {
  const steps = [
    "Date",
    "Persons Selection",
    "Accommodation",
    "Extra services",
  ];

  return (
    <div className="sticky top-0">
      <div className="flex justify-between items-center bg-gray-100 rounded-full p-2 mb-6">
        {steps.map((step, idx) => {
          const isActive = idx <= index;
          const isCurrent = idx === index;

          return (
            <div key={idx} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${
                    idx < index
                      ? "bg-[#6D4C41] text-white"
                      : isActive
                      ? "bg-[#757575] text-white"
                      : "bg-gray-300 text-gray-600"
                  } ${isCurrent ? "ring-2 ring-cyan-400" : ""}`}>
                {idx < index ? <span>✓</span> : idx + 1}
              </div>

              <span
                className={`ml-2 text-sm font-medium hidden sm:block transition-all duration-300
                  ${
                    isActive ? "text-stone-700 font-semibold" : "text-gray-500"
                  }`}>
                {step}
              </span>

              {idx < steps.length - 1 && (
                <div
                  className={`w-4 sm:w-8 h-0.5 mx-2 transition-all duration-300
                    ${
                      idx < index
                        ? "bg-[#6D4C41]"
                        : isActive
                        ? "bg-[#757575]"
                        : "bg-gray-300"
                    }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
