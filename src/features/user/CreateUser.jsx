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
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" mx-auto py-20 md:py-10 lg:py-40 px-2 text-center ">
      <p className=" text-[20px] lg:text-2xl text-stone-900 text-shadow-sm">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="w-full lg:w-85 mt-7 outline-none text-black rounded-full px-4 sm:px-6 p-2 sm:p-3 mb-4 placeholder:text-stone-400 shadow-black/30 shadow-[0_0_3px_2px] text-md lg:text-lg  "
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="tertiary" size="lg" className="w-full lg:w-85">
            Start journey
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
