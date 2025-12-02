import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LOC_SVG from "../../../public/svgs/location-pin-alt-1-svgrepo-com.svg";
import CIRCLE_SVG from "../../../public/svgs/circle-dashed-svgrepo-com.svg";
import Arrow_SVG from "../../../public/svgs/airplane-svgrepo-com.svg";
import Button from "../../components/common/Button";
import Gallery from "../../components/layout/Gallery";
import { useLoaderData } from "react-router-dom";
import StarRating from "../../components/common/StarRating";
import Registration from "../Registration/Registration";
import Header from "../../components/layout/Header";
import {
  setShowNavbar,
  setGalleryOpen,
  setSelectedImage,
  toggleExpandAll,
  toggleExpandDay,
} from "../Tours/tourSlice";
import { formatPrice } from "../../utils/formatters";
import { setCurrency } from "../../features/currency/currencySlice";

export default function TourDetails() {
  const [showRegistration, setShowRegistration] = useState(false);

  const dispatch = useDispatch();
  const { expandedDays, showNavbar, isGalleryOpen, selectedImage } =
    useSelector((state) => state.tour);
  const { selectedCurrency } = useSelector((state) => state.currency);

  // Destructure for easier access
  const {
    all: isExpandedAll,
    day1: isExpandedDay1,
    day2: isExpandedDay2,
    day3: isExpandedDay3,
    day4: isExpandedDay4,
    day5: isExpandedDay5,
  } = expandedDays;

  const tour = useLoaderData();
  const {
    id,
    name,
    adultPrice,
    childPrice,
    pax,
    gallery,
    accommodation,
    extra__services,
  } = tour;
  const [selectedCurrencyState, setSelectedCurrencyState] =
    useState(selectedCurrency);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrencyState(newCurrency);
    dispatch(setCurrency(newCurrency));
  };

  // Scroll references
  const overviewRef = useRef(null);
  const mapRef = useRef(null);

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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setSelectedImage(URL.createObjectURL(file)));
    }
  };

  const handleRemove = () => {
    dispatch(setSelectedImage(null));
    document.getElementById("imageUpload").value = "";
  };

  return (
    <div className=" bg-linear-to-r from-cyan-800 to-blue-900 ">
      <Header />
      {/*Regestration*/}
      {showRegistration && (
        <Registration
          onClose={setShowRegistration}
          id={id}
          name={name}
          adultPrice={adultPrice}
          childPrice={childPrice}
          accommodation={accommodation}
          extra__services={extra__services}
        />
      )}
      {/*Screen navbar*/}
      {showNavbar && (
        <nav className="text-stone-100 fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-sm transition-all duration-700">
          <ul className=" flex-wrap flex gap-7 lg:gap-15 text-[19px] py-4 justify-center items-center">
            <li
              onClick={() =>
                document
                  .getElementById("overview")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Overview
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("itinerary")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Itinerary
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("includes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Includes
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("info")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Important Info
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("map")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Map
            </li>
            <li
              onClick={() =>
                document
                  .getElementById("review")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-cyan-500 cursor-pointer">
              Review
            </li>
          </ul>
        </nav>
      )}
      {/*Gallery images*/}
      <div className="relative">
        {id === 1 ? (
          <div
            className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-4 
        gap-3 
        h-auto md:h-[550px] 
        p-3 sm:p-4 lg:px-25 md:px-8  
        mt-6 md:mt-10
      ">
            {/* BIG image */}
            <div className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl shadow-lg h-[200px] sm:h-[300px] md:h-full">
              <img
                src={gallery[0]}
                alt="Kabul main view"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Top-right big */}
            <div className="overflow-hidden rounded-2xl shadow-md sm:col-start-auto md:col-start-3 md:col-end-5 h-[150px] sm:h-[180px] md:h-full">
              <img
                src={gallery[1]}
                alt="Kabul spot 1"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Small images */}
            <div className="overflow-hidden rounded-2xl shadow-md h-[150px] sm:h-[180px] md:h-full">
              <img
                src={gallery[2]}
                alt="Kabul spot 2"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-md h-[150px] sm:h-[180px] md:h-full ">
              <img
                src={gallery[3]}
                alt="Kabul spot 3"
                className=" w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl my-10 mx-auto text-center py-10 md:py-20 font-semibold text-xl md:text-2xl text-blue-200">
            <p>
              This tour full details is under update{" "}
              <span className="font-bold text-emerald-200">coming soon!</span>
            </p>
          </div>
        )}

        {/* GALLERY BUTTON — RESPONSIVE POSITIONING */}
        {id === 1 && (
          <div className="absolute right-4 bottom-4 md:right-27 md:bottom-10">
            <Button onClick={() => dispatch(setGalleryOpen(!isGalleryOpen))}>
              📸 Gallary
            </Button>
          </div>
        )}

        {isGalleryOpen && (
          <Gallery
            gallery={gallery}
            setOpenGallery={(value) => dispatch(setGalleryOpen(value))}
          />
        )}
      </div>
      {/*Package all detail container*/}={/*Package concept*/}
      {id === 1 && (
        <div className=" md:mt-10 flex gap-15 md:gap-10 justify-between px-8 lg:px-25 md:px-8 text-stone-100 py-15 flex-col lg:flex-row">
          <div className=" lg:w-[70%] w-full flex flex-wrap justify-between gap-2.5 ">
            <h1 className=" font-semibold text-5xl w-[700px]">{name}</h1>
            <div className=" flex gap-3.5 h-20">
              <p className=" w-[70px] flex flex-col justify-between rounded-md overflow-hidden ">
                <span className="bg-sky-500 h-[50%]  flex items-center justify-center px-3 text-3xl ">
                  5
                </span>
                <span className="bg-stone-400 h-[50%] flex items-center justify-center text-[17px] px-3">
                  Days
                </span>
              </p>
              <p className=" w-[70px] flex flex-col justify-between  rounded-md overflow-hidden ">
                <span className="bg-sky-500 h-[50%]  flex items-center justify-center px-3 text-3xl ">
                  4
                </span>
                <span className="bg-stone-400 h-[50%] flex items-center justify-center text-[17px] px-3">
                  Nights
                </span>
              </p>
            </div>
            <p className=" italic text-stone-300 mt-5 border-b border-cyan-900 pb-3">
              The world's most customizable Kabul experience — designed just for
              you, with a dedicated travel consultant guiding you every step of
              the way and managing your itinerary for a seamless journey.
            </p>
            {/*Trip Facts*/}
            <div className=" w-full mt-8 ">
              <h1 className="font-semibold text-3xl mb-7">Trip Facts</h1>
              <ul className=" flex gap-5 md:gap-10 flex-wrap justify-between ">
                <li className="flex items-center gap-3  w-[100%] md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="hotel"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 512 512"
                      height="40"
                      width="40">
                      <path d="M0 32C0 14.3 14.3 0 32 0L480 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-176 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64C14.3 64 0 49.7 0 32zm96 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8l144 0z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Accomodation</label>
                    <div className="value text-stone-50 text-[18px]">
                      5 Star Hotel
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="far"
                      data-icon="calendar-xmark"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 448 512"
                      height="40"
                      width="40">
                      <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zM305 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Free Cancellation</label>
                    <div className="value text-stone-50 text-[18px]">
                      Yes, 10 Days before Tour start date
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="hotel"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 512 512"
                      height="40"
                      width="40">
                      <path d="M0 32C0 14.3 14.3 0 32 0L480 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-176 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32L32 64C14.3 64 0 49.7 0 32zm96 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8l144 0z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Hotel Transfer</label>
                    <div className="value text-stone-50 text-[18px]">
                      Available{" "}
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="language"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 640 512"
                      height="40"
                      width="40">
                      <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 247.2c12.4-4.7 18.7-18.5 14-30.9s-18.5-18.7-30.9-14C43.1 225.1 0 283.5 0 352c0 88.4 71.6 160 160 160c61.2 0 114.3-34.3 141.2-84.7c6.2-11.7 1.8-26.2-9.9-32.5s-26.2-1.8-32.5 9.9C240 440 202.8 464 160 464C98.1 464 48 413.9 48 352c0-47.9 30.1-88.8 72.5-104.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Language</label>
                    <div className="value text-stone-50 text-[18px]">
                      English
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="person-hiking"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 384 512"
                      height="40"
                      width="40">
                      <path d="M192 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm51.3 182.7L224.2 307l49.7 49.7c9 9 14.1 21.2 14.1 33.9l0 89.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-82.7-73.9-73.9c-15.8-15.8-22.2-38.6-16.9-60.3l20.4-84c8.3-34.1 42.7-54.9 76.7-46.4c19 4.8 35.6 16.4 46.4 32.7L305.1 208l30.9 0 0-24c0-13.3 10.7-24 24-24s24 10.7 24 24l0 55.8c0 .1 0 .2 0 .2s0 .2 0 .2L384 488c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-216-39.4 0c-16 0-31-8-39.9-21.4l-13.3-20zM81.1 471.9L117.3 334c3 4.2 6.4 8.2 10.1 11.9l41.9 41.9L142.9 488.1c-4.5 17.1-22 27.3-39.1 22.8s-27.3-22-22.8-39.1zm55.5-346L101.4 266.5c-3 12.1-14.9 19.9-27.2 17.9l-47.9-8c-14-2.3-22.9-16.3-19.2-30L31.9 155c9.5-34.8 41.1-59 77.2-59l4.2 0c15.6 0 27.1 14.7 23.3 29.8z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Tour Availability</label>
                    <div className="value text-stone-50 text-[18px]">
                      Always Available, mostly booked 30 days in advance{" "}
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="wheelchair"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 512 512"
                      height="40"
                      width="40">
                      <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM120.5 247.2c12.4-4.7 18.7-18.5 14-30.9s-18.5-18.7-30.9-14C43.1 225.1 0 283.5 0 352c0 88.4 71.6 160 160 160c61.2 0 114.3-34.3 141.2-84.7c6.2-11.7 1.8-26.2-9.9-32.5s-26.2-1.8-32.5 9.9C240 440 202.8 464 160 464C98.1 464 48 413.9 48 352c0-47.9 30.1-88.8 72.5-104.8zM259.8 176l-1.9-9.7c-4.5-22.3-24-38.3-46.8-38.3c-30.1 0-52.7 27.5-46.8 57l23.1 115.5c6 29.9 32.2 51.4 62.8 51.4l5.1 0c.4 0 .8 0 1.3 0l94.1 0c6.7 0 12.6 4.1 15 10.4L402 459.2c6 16.1 23.8 24.6 40.1 19.1l48-16c16.8-5.6 25.8-23.7 20.2-40.5s-23.7-25.8-40.5-20.2l-18.7 6.2-25.5-68c-11.7-31.2-41.6-51.9-74.9-51.9l-68.5 0-9.6-48 63.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-76.2 0z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Wheelchair</label>
                    <div className="value text-stone-50 text-[18px]">
                      Not wheelchair accessible{" "}
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]   md:w-[40%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="hands-praying"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 640 512"
                      height="40"
                      width="40">
                      <path d="M320 0c-88.2 0-160 71.8-160 160c0 88.2 71.8 160 160 160c88.2 0 160-71.8 160-160C480 71.8 408.2 0 320 0zM320 256c-35.3 0-64-28.7-64-64c0-35.3 28.7-64 64-64c35.3 0 64 28.7 64 64C384 227.3 355.3 256 320 256zM320 96c-26.5 0-48 21.5-48 48c0 26.5 21.5 48 48 48c26.5 0 48-21.5 48-48C368 117.5 346.5 96 320 96zM320 416c-26.5 0-48 21.5-48 48c0 26.5 21.5 48 48 48c26.5 0 48-21.5 48-48C368 437.5 346.5 416 320 416z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text">
                    <label className="text-stone-300">Guide</label>
                    <div className="value text-stone-50 text-[18px]">
                      Partially Guided
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 w-[100%]  md:w-[0%] lg:w-[30%] ">
                  <span class="icon-holder">
                    <svg
                      fill="#2dc2e3"
                      data-prefix="fas"
                      data-icon="person"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg-inline--fa"
                      viewBox="0 0 320 512"
                      height="40"
                      width="40">
                      <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-223.1L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6l29.7 0c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9 232 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0z"></path>
                    </svg>
                  </span>
                  <div class="trip-facts-text ">
                    <label className="text-stone-300">Maximum Age</label>
                    <div className="value text-stone-50 text-[18px]">{pax}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/*Package fare board*/}

          <div className="sticky top-15 right-20 w-full lg:w-[30%] rounded-2xl overflow-hidden flex flex-col justify-between md:gap-4 shadow-stone-600 shadow-2xl TourFullDetails border-stone-300 border self-start">
            <select
              className="outline-none border-b-[1px] border-stone-400 p-2 w-full rounded-none py-3 font-semibold text-[25px] cursor-pointer"
              value={selectedCurrencyState}
              onChange={handleCurrencyChange}>
              <option className="bg-cyan-900" value="USD">
                USD ($)
              </option>
              <option className="bg-cyan-900" value="EUR">
                EUR (€)
              </option>
              <option className="bg-cyan-900" value="AED">
                AED (د.إ)
              </option>
            </select>

            <div className="flex justify-between border-b-[1px] border-stone-400">
              <div className="w-[50%] text-center flex flex-col gap-2 border-r border-stone-400 mb-5 mt-5">
                <p className="text-[20px] text-stone-300">From</p>
                <p className="font-semibold text-3xl">
                  {formatPrice(adultPrice)}
                </p>
                <p className="text-stone-300 text-[20px]">/Adult</p>
              </div>

              <div className="w-[50%] text-center py-4 flex flex-col gap-2.5">
                <p className="text-[20px] text-stone-300">From</p>
                <p className="font-semibold text-3xl">
                  {formatPrice(childPrice)}
                </p>
                <p className="text-stone-300 text-[20px]">/Child</p>
              </div>
            </div>

            <div className="py-2 text-center mb-3">
              <Button
                type="glass"
                size="lg"
                onClick={() => setShowRegistration(true)}>
                Check availability
              </Button>
            </div>
          </div>
        </div>
      )}
      {/*Package sections*/}
      {id === 1 && (
        <div className=" px-8 lg:px-20 pb-30 w-full lg:w-[70%] ">
          <nav className=" text-stone-100">
            <ul className=" flex gap-3 flex-wrap justify-between lg:gap-15 text-[19px] border-stone-200 border-b-[1px] py-4">
              <li>
                <a
                  href=""
                  className="hover:text-cyan-500 transition-all duration-500">
                  Overview
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-cyan-500 transition-all duration-500">
                  Itinerary
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-cyan-500 transition-all duration-500">
                  Includes
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-cyan-500 transition-all duration-500">
                  Important Information
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="hover:text-cyan-500 transition-all duration-500">
                  Map
                </a>
              </li>
            </ul>
          </nav>
          {/*Overview*/}
          <section id="overview" ref={overviewRef}>
            <h2 className="text-stone-100 text-3xl font-semibold tracking-wider pt-17 pb-7 ">
              Overview
            </h2>
            <p className="text-stone-300">
              Experience Dubai like never before with this exclusive 5-day tour
              — carefully designed for travelers who seek the perfect balance of
              adventure, culture, and luxury. Every detail has been thoughtfully
              planned so that nothing feels rushed, allowing you to fully
              immerse yourself in each experience.
            </p>
            <p className="text-stone-300 mt-4">
              From soaring above the desert in a hot air balloon to standing
              atop the world's tallest building and enjoying the thrills of the
              red dunes, each moment is curated for excitement, wonder, and
              relaxation. Unlike typical tours where you are guided in a group,
              this is a special, personalized journey: you will be assigned a
              dedicated <strong>travel consultant</strong> who will be in
              contact with you at every step, coordinating your itinerary,
              assisting with optional experiences, and ensuring your Dubai
              adventure flows seamlessly.
            </p>
            <h2 className="text-stone-100 text-3xl font-semibold tracking-wider mb-7 mt-7">
              Highlights
            </h2>
            <ul className="wpte-trip-highlights text-stone-300">
              <li className="text-xl">
                <p className="text-[15px]">
                  The World's Most Customizable Dubai Experience – designed for
                  both visitors and residents seeking the perfect balance of
                  luxury, adventure, and freedom.
                </p>
              </li>
              <li class="text-xl">
                <p className="text-[15px]">
                  Personal Travel Consultant – assigned exclusively to you,
                  managing every detail of your journey and staying in touch
                  throughout your trip.
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Deluxe Hot Air Balloon Adventure – witness the sunrise over
                  the Dubai Desert Conservation Reserve, complete with in-flight
                  falconry and Bedouin breakfast.
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Burj Khalifa "At The Top" Premium Experience – enjoy priority
                  access to the highest observation decks with gourmet treats
                  and unmatched skyline views.
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Old Dubai Cultural &amp; Heritage Tour – explore the soul of
                  the city through traditional markets, museums, and local
                  experiences.
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Premium Red Dunes Desert Safari – thrilling dune bashing,
                  camel rides, sunset views, and a luxury desert dinner under
                  the stars.
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Supercar or Luxury Drive Experience – rent a Ferrari or
                  Rolls-Royce, to explore Dubai in absolute style (optional).
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Six Emirates Day Tour – experience six of the seven Emirates
                  in one unforgettable day (optional).
                </p>
              </li>
              <li class="text-xl">
                <p p className="text-[15px]">
                  Flexible Schedule – built-in free time to rest, shop, or
                  explore independently — enjoy Dubai entirely at your own pace.
                </p>
              </li>
              <li class="text-xl">
                <p className="text-[15px]">
                  Comfort &amp; Care – non-smoking vehicles, professional
                  chauffeurs, and carefully planned routes for a smooth and
                  relaxing experience.{" "}
                </p>
              </li>
              <li class="text-xl">
                <p className="text-[15px]">
                  Full Support, Every Step – your consultant remains available
                  for any last-minute plans, upgrades, or personalized
                  arrangements.
                </p>
              </li>
            </ul>
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
          {/*Itinerary*/}
          <section id="itinerary">
            <div className="flex justify-between items-center">
              <h2 className="text-stone-100 text-3xl font-semibold tracking-wider pt-17 pb-11">
                Itinerary
              </h2>
              <div className="flex items-center gap-3 select-none">
                <span
                  className={`text-stone-50 ${
                    isExpandedAll ? "opacity-60" : ""
                  }`}>
                  Expand all
                </span>
                <button
                  onClick={() => dispatch(toggleExpandAll())}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 
                ${isExpandedAll ? "bg-[#b38b4d]" : "bg-gray-200"}`}>
                  <span
                    className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 
                  ${isExpandedAll ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div
                className="flex items-center justify-between hover:bg-cyan-800 cursor-pointer p-2"
                onClick={() => dispatch(toggleExpandDay(1))}>
                <h2 className="text-stone-100 text-xl flex items-center gap-3">
                  <img
                    src={LOC_SVG}
                    alt="location icon"
                    className="h-12 bg-cyan-700 rounded-full"
                  />
                  Day 1 : Arrival & Optional Experiences
                </h2>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleExpandDay(1));
                  }}
                  src={Arrow_SVG}
                  alt="arrow icon"
                  className={
                    isExpandedDay1
                      ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                      : "rotate-0 h-7"
                  }
                />
              </div>

              {isExpandedDay1 && (
                <div className="self-end w-[93%]">
                  <p>day once content</p>
                </div>
              )}
            </div>
            <hr className="text-cyan-400 mt-5 w-[90%] ml-17" />
            <div className="mt-7 flex flex-col">
              <div
                className="flex items-center justify-between hover:bg-cyan-800 cursor-pointer p-4"
                onClick={() => dispatch(toggleExpandDay(2))}>
                <h2 className="text-stone-100 text-xl flex items-center gap-3">
                  <img
                    src={CIRCLE_SVG}
                    alt="location icon"
                    className="h-6 rounded-full"
                  />
                  Day 2 : Deluxe Hot Air Balloon Adventure & Burj Khalifa
                  Premium Experience
                </h2>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleExpandDay(2));
                  }}
                  src={Arrow_SVG}
                  alt="arrow icon"
                  className={
                    isExpandedDay2
                      ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                      : "rotate-0 h-7"
                  }
                />
              </div>
              {isExpandedDay2 && (
                <div className="text-stone-300 w-[93%] self-end">
                  <p>day 2 content</p>
                </div>
              )}
            </div>
            <hr className="text-cyan-400 mt-5 w-[90%] ml-17" />
            <div className="mt-7 flex flex-col">
              <div
                className="flex items-center justify-between hover:bg-cyan-800 cursor-pointer p-4"
                onClick={() => dispatch(toggleExpandDay(3))}>
                <h2 className="text-stone-100 text-xl flex items-center gap-3">
                  <img
                    src={CIRCLE_SVG}
                    alt="location icon"
                    className="h-6 rounded-full"
                  />
                  Day 3 : Old Dubai Heritage Tour & Premium Red Dunes Desert
                  Safari
                </h2>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleExpandDay(3));
                  }}
                  src={Arrow_SVG}
                  alt="arrow icon"
                  className={
                    isExpandedDay3
                      ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                      : "rotate-0 h-7"
                  }
                />
              </div>
              {isExpandedDay3 && (
                <div className="text-stone-300 w-[93%] self-end">
                  day 3 content
                </div>
              )}
            </div>
            <hr className="text-cyan-400 mt-5 w-[90%] ml-17" />
            <div className="mt-7 flex flex-col">
              <div
                className="flex items-center justify-between hover:bg-cyan-800 cursor-pointer p-4"
                onClick={() => dispatch(toggleExpandDay(4))}>
                <h2 className="text-stone-100 text-xl flex items-center gap-3">
                  <img
                    src={CIRCLE_SVG}
                    alt="location icon"
                    className="h-6 rounded-full"
                  />
                  Day 4 : Fully Customizable Dubai Experiences
                </h2>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleExpandDay(4));
                  }}
                  src={Arrow_SVG}
                  alt="arrow icon"
                  className={
                    isExpandedDay4
                      ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                      : "rotate-0 h-7"
                  }
                />
              </div>
              {isExpandedDay4 && (
                <div className="text-stone-300 w-[93%] self-end">
                  <p>day 4 content</p>
                </div>
              )}
              <hr className="text-cyan-600 mt-5 w-[90%] ml-17" />
            </div>
            <div className="mt-7 flex flex-col">
              <div
                className="flex items-center justify-between hover:bg-cyan-800 cursor-pointer p-2"
                onClick={() => dispatch(toggleExpandDay(5))}>
                <h2 className="text-stone-100 text-xl flex items-center gap-3">
                  <img
                    src={LOC_SVG}
                    alt="location icon"
                    className="h-12 bg-cyan-700 rounded-full"
                  />
                  Day 5 : Departure? or Extended stay
                </h2>
                <img
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleExpandDay(5));
                  }}
                  src={Arrow_SVG}
                  alt="arrow icon"
                  className={
                    isExpandedDay5
                      ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                      : "rotate-0 h-7"
                  }
                />
              </div>
              {isExpandedDay5 && (
                <div className="text-stone-300 w-[93%] self-end">
                  day 5 content
                </div>
              )}
            </div>
            <hr className="text-cyan-400 mt-5 w-[90%] ml-17" />
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
          {/*Includes and excludes*/}
          <section id="includes" className="">
            <div>
              <div>
                <h2 className="text-stone-100 text-3xl font-semibold tracking-wider pt-17 pb-7">
                  Includes
                </h2>
                <h2 className="text-stone-100 text-2xl font-semibold mb-4">
                  Cost Includes
                </h2>
                <ul className="wpte-trip-highlights includes text-stone-300 ">
                  <li>
                    A dedicated personal Travel Consultant to guide and assist
                    you throughout your journey.
                  </li>
                  <li>Airport pickup upon arrival in Dubai.</li>
                  <li>
                    Deluxe Hot Air Balloon Adventure over the Dubai Desert
                    Conservation Reserve.
                  </li>
                  <li>Burj Khalifa "At The Top" Premium Experience.</li>
                  <li>Old Dubai Cultural & Heritage Tour.</li>
                  <li>Premium Red Dunes Desert Safari</li>
                </ul>
                <h2 className="text-stone-100 text-2xl font-semibold mb-4 mt-15">
                  Cost Excludes
                </h2>
                <ul className="wpte-trip-highlights excludes text-stone-300 ">
                  <li>
                    Pick-up after the Burj Khalifa "At The Top" Premium
                    Experience (Optional).
                  </li>
                  <li>Pick-up after the Old Dubai Cultural Tour (Optional).</li>
                  <li>Airport drop-off at the end of the tour (Optional).</li>
                </ul>
              </div>
            </div>
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
          {/*Important Information*/}
          <section id="info">
            <h2 className="font-semibold text-3xl text-stone-50 pt-17 pb-7">
              Important Information
            </h2>
            <ul class="list-disc text-stone-300 mt-8 ml-4">
              <li>
                <strong>Optional Services:</strong>
                <br />
                All services marked as <strong>(Optional)</strong> throughout
                the itinerary are <strong>not included</strong> in the base
                package price. These can be added during the booking process for
                an <strong>enhanced, fully customized experience</strong>{" "}
                tailored to your preferences.
              </li>
              <li>
                <strong>Inclusions:</strong>
                <br />
                Everything explicitly mentioned in the itinerary is{" "}
                <strong>included</strong> in your package unless marked as
                (Optional).
              </li>
              <li>
                <strong>Age Requirement For the Tour:</strong>
                <br />
                Only for guests aged <strong>7 to 80 years</strong>.
              </li>
              <li>
                <strong>Age Requirement For our Rental Cars:</strong>
                <br />
                Only for guests aged <strong>25+ years</strong>.
              </li>
              <li>
                <strong>Accessibility:</strong>
                <br />
                Please note that this tour is{" "}
                <strong>not wheelchair accessible</strong> due to the nature of
                certain experiences and terrain.
              </li>
              <li>
                <strong>Transportation Policy:</strong>
                <br />
                All vehicles used for transfers and tours are{" "}
                <strong>strictly non-smoking</strong>.<br />
                Any violation of this policy will result in a{" "}
                <strong>fine of AED 2,000 + applicable taxes</strong>.
              </li>
              <li>
                <strong>Health &amp; Safety:</strong>
                <br />
                Guests are advised to inform their travel consultant of any
                medical conditions or dietary requirements in advance to ensure
                suitable arrangements are made.
              </li>
              <li>
                <strong>Dress Code &amp; Etiquette:</strong>
                <br />
                Comfortable, modest clothing is recommended, especially when
                visiting cultural or religious sites.
              </li>
              <li>
                <strong>Travel Consultant Assistance:</strong>
                <br />
                Your <strong>dedicated travel consultant</strong> will remain in
                touch throughout your journey to assist with any special
                requests, last-minute changes, or additional arrangements.
              </li>
            </ul>
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
          {/*Map*/}
          <section id="map" ref={mapRef}>
            <h2 className="font-semibold text-4xl text-stone-50 pt-17 pb-7">
              Map
            </h2>
            <div className="mt-4">
              <iframe
                title="Kabul Map"
                src="https://maps.google.com/maps?q=34.5553,69.2075&z=12&output=embed"
                className="w-full h-80 rounded-lg shadow-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
          {/*Review*/}
          <section id="review" className="mt-15">
            <div className="bg-white/10 backdrop-blur-sm p-5 ">
              <div className="flex flex-col gap-5 ">
                <h2 className="font-semibold text-2xl text-stone-50 ">
                  Write a Review
                </h2>
                <p className="text-stone-300">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <div className="flex items-center flex-wrap gap-4 text-2xl  ">
                  <p className="text-stone-200 ">
                    Rating<span className="text-red-400">*</span>
                  </p>
                  <div>
                    <StarRating />
                  </div>
                </div>
              </div>
              <form className=" mt-6 ">
                <div className="flex flex-col gap-5">
                  <input
                    type="text"
                    className=" bg-white/30 backdrop-blur-md py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-100 placeholder:text-stone-200"
                    placeholder="Review Title*"
                  />
                  <textarea
                    className=" bg-white/30 backdrop-blur-md py-3 px-5 rounded-[4px] text-stone-100 placeholder:text-stone-200 outline-none "
                    placeholder="Write Review*"
                  />
                </div>
                <hr className="border border-cyan-900 mt-7" />
                <div className=" mt-5 flex flex-col ">
                  <h2 className="text-stone-200 font-semibold text-2xl">
                    Personal Information
                  </h2>
                  <div className="flex flex-col md:flex-row items-center gap-8 mt-5 ">
                    <div
                      className={`border border-stone-400 md:w-[20%] flex flex-col items-center gap-2 p-2 relative  ${
                        selectedImage ? "bg-cover bg-center" : "bg-white/20"
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
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white/80">
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
                            className="flex flex-row-reverse items-center justify-between gap-x-4 px-4 py-2 bg-white/10 text-white rounded-lg cursor-pointer hover:bg-cyan-700 transition-all duration-300">
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
                          className="absolute bottom-1 right-1 bg-red-600 text-white text-sm px-2 py-1 rounded hover:bg-red-700 transition-all duration-300 cursor-pointer">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className=" space-y-8">
                      <input
                        type="text"
                        className=" bg-white/30 backdrop-blur-md py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-100 placeholder:text-stone-200"
                        placeholder="Your Name*"
                      />
                      <input
                        type="text"
                        className=" bg-white/30 backdrop-blur-md py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-100 placeholder:text-stone-200"
                        placeholder="Your Email*"
                      />
                      <input
                        type="text"
                        className=" bg-white/30 backdrop-blur-md py-3 px-5 rounded-[4px] w-full md:w-sm text-stone-100 placeholder:text-stone-200"
                        placeholder="Your Website*"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-cyan-600 cursor-pointer transition-all duration-300 hover:scale-110"
                    />
                    <p className="text-stone-300">
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </p>
                  </div>
                  <div className=" inline self-end mt-11">
                    <Button type="glass" size="md">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <hr className="border-[1px] border-sky-400 my-13" />
          </section>
        </div>
      )}
    </div>
  );
}
