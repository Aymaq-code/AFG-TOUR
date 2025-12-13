import BAGGAGE_IMG from "../../../public/app_images/baggage.png";
import BOARDING_IMG from "../../../public/app_images/boardingPass.png";
import AIRFLIGHT1_IMG from "../../../public/app_images/airFlight.png";
import AIRFLIGHT2_IMG from "../../../public/app_images/airFlisht2.png";
import GLASS_IMG from "../../../public/app_images/glass.png";
import Counter from "../common/Counter";

function StatsSection() {
  return (
    <section className=" px-1 lg:mb-10">
      {/*Contents*/}
      <div className="  my-20 lg:my-32 mx-auto w-full max-w-[80rem] p-2 flex items-center justify-between flex-col lg:flex-row gap-y-30 lg:gap-7 px-3 lg:px-1">
        {/*State Details*/}
        <div className=" w-full lg:w-[52%] ">
          <ul className="flex flex-col gap-7 lg:gap-10">
            <li className="flex items-center justify-center flex-col lg:flex-row gap-2 lg:gap-4">
              <div className="flex flex-col items-center justify-between gap-2 lg:w-lg self-baseline">
                <h2 className="self-baseline opacity-90 font-bold text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 text-[#0187c9] hover:text-[#df711b]">
                  <Counter end={40000} /> +
                </h2>

                <h2 className="self-baseline font-semibold text-lg sm:text-xl transition-all duration-300 text-[#df711b] hover:text-[#0187c9]">
                  Happy Customers
                </h2>
              </div>
              <p className="text-cyan-800 opacity-80 text-sm sm:text-base lg:text-lg w-8xl lg:w-4xl">
                Reiciendis excepturi expedita quae architecto mollitia
                voluptatem minus quidem voluptate laboriosam, id voluptas, nisi
                natus. Voluptates ad eveniet distinctio molestias optio
                possimus.
              </p>
            </li>
            <li className="flex items-center justify-center flex-col lg:flex-row lg:gap-4">
              <div className="flex flex-col items-center justify-between gap-2 lg:w-lg self-baseline">
                <h2 className="self-baseline opacity-90 font-bold text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 text-[#0187c9] hover:text-[#df711b]">
                  <Counter end={500} /> +
                </h2>

                <h2 className="self-baseline font-semibold text-lg sm:text-xl transition-all duration-300 text-[#df711b] hover:text-[#0187c9]">
                  Happy Customers
                </h2>
              </div>
              <p className="text-cyan-800 opacity-80 text-sm sm:text-base lg:text-lg w-8xl lg:w-4xl">
                Reiciendis excepturi expedita quae architecto mollitia
                voluptatem minus quidem voluptate laboriosam, id voluptas, nisi
                natus. Voluptates ad eveniet distinctio molestias optio
                possimus.
              </p>
            </li>
            <li className="flex items-center justify-center flex-col lg:flex-row gap-2 lg:gap-4">
              <div className="flex flex-col items-center justify-between gap-2 lg:w-lg self-baseline">
                <h2 className="self-baseline opacity-90 font-bold text-4xl sm:text-5xl lg:text-6xl transition-all duration-300 text-[#0187c9] hover:text-[#df711b]">
                  <Counter end={98} /> %
                </h2>

                <h2 className="self-baseline font-semibold text-lg sm:text-xl transition-all duration-300 text-[#df711b] hover:text-[#0187c9]">
                  Happy Customers
                </h2>
              </div>
              <p className="text-cyan-800 opacity-80 text-sm sm:text-base lg:text-lg w-8xl lg:w-4xl">
                Reiciendis excepturi expedita quae architecto mollitia
                voluptatem minus quidem voluptate laboriosam, id voluptas, nisi
                natus. Voluptates ad eveniet distinctio molestias optio
                possimus.
              </p>
            </li>
          </ul>
        </div>
        {/*State wrapper*/}
        <div
          className=" relative bg-[url('/app_images/download.svg')] bg-no-repeat bg-center bg-cover 
  w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] 
  rounded-full p-2 flex items-center justify-center mx-auto ">
          <img
            src={BAGGAGE_IMG}
            className="baggageAnimate absolute top-5 h-[12rem] sm:h-[15rem] md:h-[20rem] z-10"
            alt="baggage"
          />

          <img
            src={BOARDING_IMG}
            className="boardingAnimation absolute left-0 top-10 h-[3rem] sm:h-[4rem] md:h-[5rem] z-20"
            alt="boarding"
          />

          <img
            id="test"
            src={AIRFLIGHT1_IMG}
            className="airFlight_1Animate absolute right-0 top-10 h-[3rem] sm:h-[4rem] md:h-[5rem] z-20"
            alt="air flight"
          />

          <img
            src={AIRFLIGHT2_IMG}
            className="airFlight_1Animate absolute -bottom-3 left-16 h-[3.5rem] sm:h-[4.5rem] md:h-[6rem] z-20"
            alt="air flight 2"
          />

          <img
            src={GLASS_IMG}
            className="glassAnimate absolute right-1 md:right-7 bottom-20 h-[4.5rem] sm:h-[6rem] md:h-[7.5rem] z-10"
            alt="glass"
          />
        </div>
      </div>
    </section>
  );
}
export default StatsSection;
