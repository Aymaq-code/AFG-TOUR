function ProgressBar({ index }) {
  const steps = [
    "Date",
    "Persons Selection",
    "Accommodation",
    "Extra services",
  ];

  // Calculate current active step based on user progress
  const getActiveStep = () => {
    switch (index) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getActiveStep();

  return (
    <div className="sticky top-0 z-20">
      <div className="flex justify-between items-center bg-gray-100 rounded-full p-2 mb-6">
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}>
                {isCompleted ? <span>✓</span> : index + 1}
              </div>

              <span
                className={`ml-2 text-sm font-medium hidden sm:block transition-all duration-300
                  ${
                    isActive ? "text-cyan-600 font-semibold" : "text-gray-500"
                  }`}>
                {step}
              </span>

              {index < steps.length - 1 && (
                <div
                  className={`w-4 sm:w-8 h-0.5 mx-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-green-500"
                        : isActive
                        ? "bg-cyan-300"
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
