import { useRegistrationStore } from "../../store/registrationStore";
import Button from "../../components/common/Button";
import { formatPrice } from "../../utils/formatters";

export default function ExtraServices({ extra__services }) {
  const selectedServices = useRegistrationStore((s) => s.selectedServices);
  const toggleService = useRegistrationStore((s) => s.toggleService);

  const prev = useRegistrationStore((s) => s.prev);

  return (
    <div className="bg-gray-100 rounded-xl p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/50">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
          Extra Services
        </h3>
        <h3 className="text-stone-200">
          Upgrade your experience with optional add-ons.
        </h3>
      </div>

      <div className="space-y-4 mt-4">
        {extra__services?.map((service) => (
          <div
            key={service.id}
            onClick={() => toggleService(service)}
            className={`p-4 border-3 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center ${
              selectedServices.find((s) => s.id === service.id)
                ? "border-cyan-400 bg-cyan-900/20"
                : "border-slate-400 hover:border-cyan-400"
            }`}>
            <div className="text-left flex-1">
              <h3 className="text-stone-100 font-semibold">{service.title}</h3>
              <h4 className="font-semibold">{service.name}</h4>
              <p className="text-sm text-slate-300">{service.description}</p>
            </div>
            <p className="text-stone-100 font-semibold">
              {formatPrice(service.price)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10 flex-col gap-3 md:flex-row ">
        <Button size="md" onClick={prev} className="">
          Back
        </Button>
        <div>
          <Button type="secondary" size="md" to={"/payment"} className="w-full">
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
