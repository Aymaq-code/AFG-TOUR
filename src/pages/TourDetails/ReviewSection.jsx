import { useState } from "react";
import { useDispatch } from "react-redux";
import StarRating from "../../components/common/StarRating";
import Button from "../../components/common/Button";
import { setSelectedImage } from "../Tours/tourSlice";

export default function ReviewSection() {
  const dispatch = useDispatch();
  const [selectedImage, setLocalSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalSelectedImage(imageUrl);
      dispatch(setSelectedImage(imageUrl));
    }
  };

  const handleRemove = () => {
    setLocalSelectedImage(null);
    dispatch(setSelectedImage(null));
    const fileInput = document.getElementById("imageUpload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <section
      id="review"
      className="mt-15 border-[1px] border-stone-400 rounded-2xl overflow-hidden shadow-black/40 shadow-[0_2px_4px]">
      <div className="bg-white/10 backdrop-blur-sm p-5">
        <div className="flex flex-col gap-5">
          <h2 className="font-semibold text-2xl text-stone-900">
            Write a Review
          </h2>
          <p className="text-stone-800">
            Your email address will not be published. Required fields are marked
            *
          </p>
          <div className="flex items-center flex-wrap gap-4 text-2xl">
            <p className="text-stone-800">
              Rating<span className="text-red-400">*</span>
            </p>
            <div>
              <StarRating />
            </div>
          </div>
        </div>
        <form className="mt-6">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="border-[.5px] border-stone-400 py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-950 placeholder:text-stone-500 focus:outline-stone-600"
              placeholder="Review Title*"
            />
            <textarea
              className="border-[.5px] border-stone-400 py-3 px-5 rounded-[4px] text-stone-950 placeholder:text-stone-500 focus:outline-stone-600"
              placeholder="Write Review*"
            />
          </div>
          <hr className="border-[1px] border-stone-400 mt-7" />
          <div className="mt-5 flex flex-col">
            <h2 className="text-stone-900 font-semibold text-2xl">
              Personal Information
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mt-5">
              <div
                className={`border border-stone-400 md:w-[20%] flex flex-col items-center gap-2 p-2 relative ${
                  selectedImage ? "bg-cover bg-center" : "bg-stone-200"
                }`}
                style={
                  selectedImage
                    ? {
                        backgroundImage: `url(${selectedImage})`,
                        height: "180px",
                        width: "250px",
                      }
                    : {}
                }>
                {!selectedImage && (
                  <>
                    <svg
                      width="96"
                      height="96"
                      viewBox="0 0 96 96"
                      fill="red"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        strokeOpacity="0.15"
                        cx="48"
                        cy="48"
                        r="47.6"
                        fill="white"
                        stroke="currentColor"
                        strokeWidth="0.7"
                      />
                      <circle
                        fillOpacity="0.1"
                        cx="48"
                        cy="48"
                        r="44"
                        fill="currentColor"
                      />
                      <path
                        d="M28.5 43.07C32.09 43.07 35 39.92 35 36.03C35 32.15 32.09 29 28.5 29C24.91 29 22 32.15 22 36.03C22 39.92 24.91 43.07 28.5 43.07Z"
                        fill="white"
                      />
                      <path
                        d="M43.67 57.14L35 47.76L22 61.83V66.52H74V61.83L56.67 43.07L43.67 57.14Z"
                        fill="white"
                      />
                    </svg>

                    <label
                      htmlFor="imageUpload"
                      className="flex flex-row-reverse items-center justify-between gap-x-4 px-4 py-2 bg-stone-300 text-stone-600 rounded-lg cursor-pointer hover:bg-cyan-700 transition-all duration-300">
                      Upload Image
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.666 13.333L10 10M10 10l3.333 3.333M10 10V17.5M16.666 13.952C17.684 13.112 18.333 11.84 18.333 10.417C18.333 7.885 16.281 5.833 13.749 5.833C13.567 5.833 13.397 5.738 13.304 5.581C12.218 3.737 10.211 2.5 7.916 2.5C4.464 2.5 1.666 5.298 1.666 8.75C1.666 10.472 2.362 12.031 3.488 13.161"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  </>
                )}

                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {selectedImage && (
                  <button
                    onClick={handleRemove}
                    className="absolute bottom-1 right-1 bg-red-600 text-stone-100 text-sm px-2 py-1 rounded hover:bg-red-700 transition-all duration-300 cursor-pointer">
                    Remove
                  </button>
                )}
              </div>
              <div className="space-y-8">
                <input
                  type="text"
                  className="border-[.5px] border-stone-400 py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-900 placeholder:text-stone-400 focus:outline-stone-600"
                  placeholder="Your Name*"
                />
                <input
                  type="text"
                  className="border-[.5px] border-stone-400 py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-900 placeholder:text-stone-400 focus:outline-stone-600"
                  placeholder="Your Email*"
                />
                <input
                  type="text"
                  className="border-[.5px] border-stone-400 py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-900 placeholder:text-stone-400 focus:outline-stone-600"
                  placeholder="Your Website*"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                className="w-5 h-5 accent-stone-500 cursor-pointer transition-all duration-300 hover:scale-110"
              />
              <p className="text-stone-800">
                Save my name, email, and website in this browser for the next
                time I comment.
              </p>
            </div>
            <div className="inline self-end mt-11">
              <Button type="secondary" className="" size="md">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
