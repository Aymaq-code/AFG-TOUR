// src/components/PersonSelection.js
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../cart/cartSlice";

function PersonSelection({ adultPrice, childPrice, index, setIndex }) {
  const adult = useSelector((state) =>
    state.cart.items.find((i) => i.id === "adult")
  );
  const child = useSelector((state) =>
    state.cart.items.find((i) => i.id === "child")
  );
  const dispatch = useDispatch();

  return (
    <div className="  bg-gray-100 rounded-xl px-5 py-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl shadow-slate-900/50">
      <h3 className="text-2xl font-bold mb-2 text-center text-cyan-400">
        Travelers
      </h3>
      <p className="text-stone-200">
        Choose how many people will be joining this experience
      </p>
      <div className="mt-10 flex flex-col gap-4">
        {/* Adult selection */}
        <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
          <div>
            <p className="text-stone-50">Adult</p>
            <p className="text-stone-300">Minimum: 1</p>
          </div>

          <div>
            <p className="text-stone-50">
              USD <span className="font-semibold">{adultPrice}</span>
            </p>
            <p className="text-stone-300">/Person</p>
          </div>

          <div className="flex items-center gap-5 ">
            <Button
              type="icon"
              onClick={() =>
                adult.quantity > 1 &&
                dispatch(
                  updateQuantity({
                    id: "adult",
                    quantity: adult.quantity - 1,
                  })
                )
              }>
              -
            </Button>

            <span className="font-semibold text-stone-100">
              {adult.quantity}
            </span>

            <Button
              type="icon"
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: "adult",
                    quantity: adult.quantity + 1,
                  })
                )
              }>
              +
            </Button>
          </div>
        </div>

        {/* Child selection */}
        <div className="bg-white/20 backdrop-blur-md flex justify-between items-center p-2 rounded-md">
          <div>
            <p className="text-stone-50">Child</p>
            <p className="text-stone-300">Minimum: 0</p>
          </div>

          <div>
            <p className="text-stone-50">
              USD <span className="font-semibold">{childPrice}</span>
            </p>
            <p className="text-stone-300">/Person</p>
          </div>

          <div className="flex items-center gap-5 ">
            <Button
              type="icon"
              onClick={() =>
                child.quantity > 0 &&
                dispatch(
                  updateQuantity({
                    id: "child",
                    quantity: child.quantity - 1,
                  })
                )
              }>
              -
            </Button>

            <span className="font-semibold text-stone-100">
              {child.quantity}
            </span>

            <Button
              type="icon"
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: "child",
                    quantity: child.quantity + 1,
                  })
                )
              }>
              +
            </Button>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-3">
          <Button type="glass" size="sm" onClick={() => setIndex(index - 1)}>
            Back
          </Button>
          <Button type="glass" size="sm" onClick={() => setIndex(index + 1)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PersonSelection;
