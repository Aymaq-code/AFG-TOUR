// ExtraServices.jsx (updated)
import Button from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatters";

function ExtraServices({
  extra__services,
  selectedServices,
  onSelectServices,
  index,
  setIndex,
}) {
  const handleServiceSelection = (service) => {
    onSelectServices(service);
  };

  const isServiceSelected = (service) => {
    return selectedServices.some((s) => s.id === service.id);
  };

  const calculateTotalServicesPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  return (
    <div className="bg-gray-100 rounded-xl p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/50">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
          Extra Services
        </h3>
        <h3 className="text-stone-200">
          Upgrade your experience with optional add-ons.
        </h3>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <div className="mt-4 p-3 bg-cyan-900/30 rounded-lg">
            <p className="text-cyan-300 font-semibold">
              {selectedServices.length} service(s) selected - Total:{" "}
              {formatCurrency(calculateTotalServicesPrice())}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        {extra__services.map((service) => (
          <div
            onClick={() => handleServiceSelection(service)}
            key={service.id}
            className={`bg-white/20 backdrop-blur-md flex justify-between items-center p-3 rounded-md mt-2 cursor-pointer hover:bg-white/30 transition-all duration-300 ${
              isServiceSelected(service)
                ? "ring-2 ring-cyan-400 bg-cyan-500/20"
                : ""
            }`}>
            <div className="text-left flex-1">
              <h3 className="text-stone-100 font-semibold">{service.title}</h3>
              <p className="text-stone-300 text-sm">{service.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-stone-100 font-semibold">
                {formatCurrency(service.price)}
              </p>
              <div
                className={`w-4 h-4 rounded border-2 ${
                  isServiceSelected(service)
                    ? "bg-cyan-400 border-cyan-400"
                    : "bg-transparent border-stone-400"
                }`}>
                {isServiceSelected(service) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/+93708760475?text=Hi! I'd like to inquire about more extra services for my tour"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 text-stone-100 font-semibold bg-white/20 backdrop-blur-md flex justify-center items-center p-3 rounded-md cursor-pointer hover:bg-white/30 transition-all duration-300">
        📱 I want more extra services - Contact on WhatsApp
      </a>

      <div className="flex justify-between items-center flex-col md:flex-row gap-3 text-stone-50 mt-10">
        <Button type="glass" size="sm" onClick={() => setIndex(index - 1)}>
          Back
        </Button>
        <div>
          <Button
            type="glass"
            size="md"
            className="bg-white/10 backdrop-blur-sm text-stone-50 inline-flex text-md uppercase font-semibold px-10 py-3.5 rounded-full hover:bg-emerald-800 shadow-slate-500 shadow-lg hover:shadow-sm hover:translate-y-1 transition-all duration-300 cursor-pointer"
            to={"/payment"}>
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExtraServices;
