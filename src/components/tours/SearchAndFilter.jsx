// SearchTour.jsx
import { useState } from "react";

export default function SearchTour({
  onSearchChange,
  hasSearchResults = true,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Find tour..."
        value={inputValue}
        onChange={handleSearch}
        className="w-full md:w-md px-3 py-2 focus:outline-none rounded-full placeholder:text-stone-400 text-stone-900 border border-stone-400"
      />
      {!hasSearchResults && inputValue.trim() !== "" && (
        <p className="text-red-400 text-sm mt-2 ml-2">
          This tour or destination is not available.
        </p>
      )}
    </div>
  );
}
