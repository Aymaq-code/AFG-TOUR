import { useDispatch } from "react-redux";
import Button from "../../components/common/Button";
import Gallery from "../../components/layout/Gallery";
import { setGalleryOpen } from "../Tours/tourSlice";

export default function GallerySection({
  gallery,
  onGalleryOpen,
  isGalleryOpen,
}) {
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className="grid grid-cols-4 grid-rows-2 px-5 md:px-12 lg:px-30 lg:h-[35rem] md:gap-3 gap-1 mt-10">
        {/* BIG image */}
        <div className="col-start-1 col-end-3 row-start-1 -row-end-1 rounded-xl overflow-hidden">
          <img src={gallery[0]} alt="Main view" className="h-full w-full" />
        </div>

        {/* Top-right big */}
        <div className="col-start-3 -col-end-1 row-start-1 row-end-2 rounded-xl overflow-hidden">
          <img src={gallery[1]} alt="Spot 1" className="h-full w-full" />
        </div>

        {/* Small images */}
        <div className="col-start-3 col-end-4 row-start-2 -row-end-1 overflow-hidden rounded-xl">
          <img src={gallery[2]} alt="Spot 2" className="h-full w-full" />
        </div>

        <div className="col-start-4 -col-end-1 row-start-2 -row-end-1 rounded-xl overflow-hidden">
          <img src={gallery[3]} alt="Spot 3" className="h-full w-full" />
        </div>
      </div>

      {/* GALLERY BUTTON */}
      <div className="absolute bottom-2 right-35">
        <Button onClick={onGalleryOpen} type="tertiary">
          📸 Gallery
        </Button>
      </div>

      {isGalleryOpen && (
        <Gallery
          gallery={gallery}
          setOpenGallery={(value) => dispatch(setGalleryOpen(value))}
        />
      )}
    </div>
  );
}
