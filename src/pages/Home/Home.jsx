import Header from "../../components/layout/Header";
import Button from "../../components/common/Button";
import { getTours } from "../../services/apiTour";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearName } from "../../features/user/userSlice";
import StatsSection from "../../components/tours/StatsSection";
import Testimonial from "../../components/tours/Testimonial";

export default function Home() {
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function loadTours() {
      const data = await getTours();
      setTours(data);
    }
    loadTours();
  }, []);

  return (
    <>
      <div className=" flex flex-col justify-between  shadow-black/30 shadow-[0_0_7px_5px] bg-[url('/afg_img/BIN/BIN-7.webp')] bg-no-repeat bg-cover bg-center min-h-screen ">
        {/* Header with navigation */}
        <Header />
        {/* Hero Section */}
        <section className=" flex-col items-center justify-center mb-22 lg:mb-67 md:mb-30 ">
          {/* Main Heading */}
          <h1 className=" text-center font-[DM_Serif_Text] font-semibold uppercase tracking-[10px] text-stone-50 text-shadow-md/30 overflow-y-hidden ">
            <span className="animate-[scaleUp_1s_ease_1.5s_both] block text-4xl md:text-5xl lg:text-7xl leading-tight md:mt-15 lg:mt-1">
              Explore the Heart of
            </span>
            <span className="animate-[scaleUp_1s_ease-in-out_1s_both] AsiaAnimate block text-5xl sm:text-6xl md:text-6xl lg:text-8xl text-sky-300 text-shadow-lg/50 ">
              Asia
            </span>
          </h1>
        </section>
        {/* Custom Section */}
        <div className=" animate-[bounceIn_1.5s_ease_2s_both] px-2 lg:px-5 py-6 lg:py-4 bg-sky backdrop-blur-sm text-white w-full flex items-center justify-cendter lg:flex-row flex-col gap-6 lg:gap-20">
          {/*Titel and user name*/}
          <div className=" font-semibold text-stone-100 text-xl lg:text-2xl px-4 border-r-[2px] border-stone-300 w-full lg:w-auto ">
            {!userName ? (
              <>
                Plan Your <br /> Next Adventure
              </>
            ) : (
              <div className=" flex items-center justify-center gap-7">
                <p>
                  Welcome, <span className="uppercase">{userName}</span>
                </p>
                <Button
                  onClick={() => dispatch(clearName())}
                  size="sm"
                  className="px-3 py-1 bg-red-500 text-white transition-all duration-200 ">
                  Remove
                </Button>
              </div>
            )}
          </div>

          {/* Tour Lists */}
          <div className=" border-r-[2px] border-stone-300 px-4 w-full lg:w-auto ">
            <label className="text-stone-100">Select Tour Location</label>
            <select className="w-full outline-none capitalize text-white font-bold border-none">
              {tours.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-auto  flex-1 ">
            <Button
              to="/tours"
              type="outline"
              size="lg"
              className="StartTourBtnAnimate w-full ">
              Start Now
            </Button>
          </div>
        </div>
      </div>
      <StatsSection />
      <Testimonial />
    </>
  );
}
