import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import Registration from "../Registration/Registration";
import Button from "../../components/common/Button";

import { setShowNavbar, setGalleryOpen } from "../Tours/tourSlice";
import { setCurrency } from "../../features/currency/currencySlice";

import PriceBoard from "./PriceBoard";
import ResponsivePriceBoard from "./ResponsivePriceBoard";
import ResponsiveNavbar from "./ResponsiveNavbar";
import GallerySection from "./GallerySection";
import TourFacts from "./TourNavbar";
import Itinerary from "./IncludesExcludes";
import Overview from "./Itinerary";
import LgScreenNavbar from "./LgScreenNavbar";
import IncludesExcludes from "./IncludesExcludes ";
import ImportantInfo from "./ImportantInfo";
import ReviewSection from "./ReviewSection";
import MapSection from "./MapSection";

// Import new components

export default function TourDetails() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNavbar, isGalleryOpen } = useSelector((state) => state.tour);
  const { selectedCurrency } = useSelector((state) => state.currency);

  const tour = useLoaderData();
  const { id, name, adultPrice, childPrice, gallery } = tour;
  const [selectedCurrencyState, setSelectedCurrencyState] =
    useState(selectedCurrency);

  const overviewRef = useRef(null);
  const mapRef = useRef(null);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrencyState(newCurrency);
    dispatch(setCurrency(newCurrency));
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!overviewRef.current || !mapRef.current) return;

      const overviewTop = overviewRef.current.getBoundingClientRect().top;
      const mapBottom = mapRef.current.getBoundingClientRect().bottom;

      if (overviewTop <= window.innerHeight * 0.2 && mapBottom > 0) {
        dispatch(setShowNavbar(true));
      } else {
        dispatch(setShowNavbar(false));
      }

      // Track active section
      const sections = [
        "overview",
        "itinerary",
        "includes",
        "info",
        "map",
        "review",
      ];
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  // Disable body scroll when Registration or Gallery is open
  useEffect(() => {
    const isModalOpen = showRegistration || isGalleryOpen;
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [showRegistration, isGalleryOpen]);

  if (id !== 1) {
    return (
      <div className="bg-linear-to-r from-[#ECEFF1] to-[#ECEFF1]">
        <div className="bg-[#757575] shadow-black/80 shadow-[0_0_9px_3px]">
          <Header />
        </div>
        <div className="  h-[85vh] flex items-center justify-center flex-col px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sky-600 hover:text-sky-500 transition-colors  cursor-pointer ">
            <span className="text-2xl mr-2">←</span>
            Back to Booking
          </button>
          <p className=" text-[20px] lg:text-3xl ">
            This tour full details is under update
            <span className="font-bold"> coming soon!</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-[#ECEFF1] to-[#ECEFF1]">
      <div className="bg-[#757575] shadow-black/80 shadow-[0_0_9px_3px]">
        <Header />
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <Registration
          onClose={setShowRegistration}
          id={id}
          name={name}
          adultPrice={adultPrice}
          childPrice={childPrice}
          accommodation={tour.accommodation}
          extra__services={tour.extra__services}
        />
      )}

      {/* Responsive Screen Navbar */}
      <ResponsiveNavbar
        showNavbar={showNavbar && !showRegistration}
        activeSection={activeSection}
      />

      {/* Gallery Section */}
      <GallerySection
        gallery={gallery}
        onGalleryOpen={() => dispatch(setGalleryOpen(!isGalleryOpen))}
        isGalleryOpen={isGalleryOpen}
      />

      {/* Responsive Price Board */}
      {!showRegistration && (
        <ResponsivePriceBoard
          adultPrice={adultPrice}
          childPrice={childPrice}
          setShowRegistration={setShowRegistration}
          selectedCurrencyState={selectedCurrencyState}
          handleCurrencyChange={handleCurrencyChange}
        />
      )}

      {/* Package all detail container */}
      <div className="relative">
        {/* Price Board */}
        <PriceBoard
          selectedCurrencyState={selectedCurrencyState}
          handleCurrencyChange={handleCurrencyChange}
          adultPrice={adultPrice}
          childPrice={childPrice}
          setShowRegistration={setShowRegistration}
          showNavbar={showNavbar}
        />

        {/* Tour Facts */}
        <TourFacts name={name} pax={tour.pax} />

        {/* Package sections */}
        <div className="relative lg:-top-95 m px-8 lg:px-20 pb-30 w-full lg:w-[70%]">
          {/* Lg Screens Navbar */}
          <LgScreenNavbar />

          {/* Overview */}
          <Overview ref={overviewRef} />

          {/* Itinerary */}
          <Itinerary />

          {/* Includes and Excludes */}
          <IncludesExcludes />

          {/* Important Information */}
          <ImportantInfo />

          {/* Map */}
          <MapSection ref={mapRef} />

          {/* Review */}
          <ReviewSection />
        </div>
      </div>
    </div>
  );
}
