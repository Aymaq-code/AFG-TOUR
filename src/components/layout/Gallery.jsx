import { useState, useEffect, useRef } from "react";

export default function Gallery({ setOpenGallery, gallery }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  function closeGallery() {
    setOpenGallery(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={galleryRef}
      className="fixed inset-0 w-full h-full bg-[#000000e6] z-[1000] flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      {/* Close Button */}
      <button
        onClick={closeGallery}
        className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl absolute right-4 top-4 md:right-6 md:top-6 cursor-pointer z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-opacity-70 transition-all"
        aria-label="Close gallery">
        &times;
      </button>

      {/* Main Gallery Container */}
      <div className="relative w-full max-w-6xl h-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="hidden md:flex text-white font-semibold text-3xl lg:text-4xl cursor-pointer transition-all duration-300 hover:scale-110 bg-black bg-opacity-50 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center hover:bg-opacity-70"
          aria-label="Previous image">
          &larr;
        </button>

        {/* Image Container */}
        <div className="relative w-full flex-1 flex justify-center">
          <img
            src={gallery[currentImageIndex]}
            alt="Gallery image"
            className="w-full max-w-2xl lg:max-w-4xl h-auto max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-all duration-500"
          />

          {/* Mobile Navigation Arrows */}
          <div className="md:hidden absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
            <button
              onClick={prevImage}
              className="text-white font-semibold text-2xl cursor-pointer transition-all duration-300 hover:scale-110 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Previous image">
              &larr;
            </button>
            <button
              onClick={nextImage}
              className="text-white font-semibold text-2xl cursor-pointer transition-all duration-300 hover:scale-110 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Next image">
              &rarr;
            </button>
          </div>
        </div>

        {/* Desktop Right Arrow */}
        <button
          onClick={nextImage}
          className="hidden md:flex text-white font-semibold text-3xl lg:text-4xl cursor-pointer transition-all duration-300 hover:scale-110 bg-black bg-opacity-50 rounded-full w-12 h-12 lg:w-14 lg:h-14 items-center justify-center hover:bg-opacity-70"
          aria-label="Next image">
          &rarr;
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm md:text-base">
          {currentImageIndex + 1} / {gallery.length}
        </div>
      </div>
    </div>
  );
}
