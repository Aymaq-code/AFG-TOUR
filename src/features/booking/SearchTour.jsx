// SearchTour.jsx
export default function SearchTour({ isMobile }) {
  return (
    <div
      className={`
      border-2 border-stone-300 rounded-full 
      transition-all duration-300 md:w-[30%] 
      ${isMobile ? "w-full mt-4" : "w-48"}
    `}>
      <input
        type="text"
        placeholder="Find tour..."
        className="w-full px-3 py-2 focus:outline-none  rounded-full placeholder:text-stone-300 text-stone-200"
      />
    </div>
  );
}
