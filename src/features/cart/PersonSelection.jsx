import Button from "../../components/common/Button";
import { useRegistrationStore } from "../../store/registrationStore";
import { formatCurrency } from "../../utils/formatters";

export default function PersonSelection() {
  const adult = useRegistrationStore((s) => s.adultQuantity);
  const child = useRegistrationStore((s) => s.childQuantity);
  const adultUnitPrice = useRegistrationStore((s) => s.adultUnitPrice);
  const childUnitPrice = useRegistrationStore((s) => s.childUnitPrice);
  const setAdult = useRegistrationStore((s) => s.setAdultQuantity);
  const setChild = useRegistrationStore((s) => s.setChildQuantity);

  const next = useRegistrationStore((s) => s.next);
  const prev = useRegistrationStore((s) => s.prev);

  return (
    <div className="bg-gray-100 rounded-xl px-5 pt-7 pb-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/50">
      <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
        Travelers
      </h3>

      <p className="text-stone-200">
        Choose how many people will be joining this experience
      </p>

      <div className="mt-6 space-y-6">
        {/* Adults */}
        <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
          <div>
            <p className="text-stone-50">Adult</p>
            <p className="text-stone-300">Minimum: 1</p>
          </div>
          <div>
            <p className="text-stone-50">
              <span className="font-semibold">
                {formatCurrency(adultUnitPrice)}
              </span>
            </p>
            <p className="text-stone-300">/Person</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setAdult(Math.max(1, adult - 1))}
              type="icon">
              -
            </Button>

            <span className="font-semibold text-stone-100">{adult}</span>

            <Button onClick={() => setAdult(adult + 1)} type="icon">
              +
            </Button>
          </div>
        </div>

        {/* Children */}
        <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
          <div>
            <p className="text-stone-50">Child</p>
            <p className="text-stone-300">Minimum: 0</p>
          </div>
          <div>
            <p className="text-stone-50">
              <span className="font-semibold">
                {formatCurrency(childUnitPrice)}
              </span>
            </p>
            <p className="text-stone-300">/Person</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setChild(Math.max(0, child - 1))}
              type="icon">
              -
            </Button>

            <span className="font-semibold text-stone-100">{child}</span>

            <Button onClick={() => setChild(child + 1)} type="icon">
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <Button type="glass" size="sm" onClick={prev}>
          Back
        </Button>

        <Button type="glass" size="sm" onClick={next}>
          Continue
        </Button>
      </div>
    </div>
  );
}
