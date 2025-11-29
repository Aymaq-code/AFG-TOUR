import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    setUsername("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="py-20 sm:py-30 md:py-46 px-4 sm:px-6 md:px-10 text-center">
      <p className="mb-4 sm:mb-6 md:mb-7 text-base sm:text-lg md:text-2xl text-stone-100 text-shadow-lg">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="w-full sm:w-70 md:w-85 outline-none text-stone-50 border-emerald-500 border rounded-full px-4 sm:px-6 p-2 sm:p-3 mb-4 placeholder:text-emerald-300 shadow-md text-sm sm:text-base"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="glass" size="lg">
            Start journey
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
