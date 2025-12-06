import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import Button from "../../components/common/Button";

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
      className="py-20 sm:py-30 md:py-46 px-4 sm:px-6 md:px-10 text-center ">
      <p className="mb-4 sm:mb-6 md:mb-7 text-base sm:text-lg md:text-2xl text-stone-900 text-shadow-sm">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="w-full sm:w-70 md:w-85 outline-none text-black rounded-full px-4 sm:px-6 p-2 sm:p-3 mb-4 placeholder:text-stone-400 shadow-black/30 shadow-[0_0_3px_2px] text-sm sm:text-base"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="tertiary" size="lg">
            Start journey
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
