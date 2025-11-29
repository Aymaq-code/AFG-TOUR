import { useState, useEffect, useRef } from "react";

export default function Gallery({ setOpenGallery, gallery }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryRef = useRef(null);

  const [IMG_1, IMG_2, IMG_3, IMG_4] = gallery;

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
      className="absolute top-0 w-full h-screen bg-[#000000b6]"
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      <span
        onClick={closeGallery}
        className="text-stone-200 font-semibold text-5xl absolute right-5 cursor-pointer top-2">
        &times;
      </span>

      <div className=" w-[1200px] h-[600px] absolute top-20 left-40 flex justify-between items-center overflow-hidden">
        <span
          onClick={prevImage}
          className="text-stone-300 font-semibold text-5xl cursor-pointer transition-all duration-500 hover:-translate-x-1">
          &larr;
        </span>

        <img
          src={gallery[currentImageIndex]}
          alt="Kabul main view"
          className="w-[65%] h-[550px] duration-500 hover:scale-105"
        />

        <span
          onClick={nextImage}
          className="text-stone-300 font-semibold text-5xl cursor-pointer transition-all duration-500 hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </div>
  );
}
