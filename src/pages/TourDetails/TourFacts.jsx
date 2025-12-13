import { useLoaderData } from "react-router-dom";

export default function TourFacts() {
  const tour = useLoaderData();
  const { id, name, pax } = tour;

  if (id === 1)
    return (
      <div className=" relative lg:-top-100 md:mt-10 flex gap-15 md:gap-10 justify-between px-8 lg:px-25 md:px-8 text-stone-900 py-15 flex-col lg:flex-row">
        <div className=" lg:w-[70%] w-full flex flex-wrap justify-between gap-2.5 ">
          <h1 className=" font-semibold text-5xl w-[700px]">{name}</h1>
          <div className=" flex gap-3.5 h-20">
            <p className=" w-[70px] flex flex-col justify-between rounded-md overflow-hidden shadow-[0_0_3px_.6px] shadow-black/60 ">
              <span className="bg-[#757575] text-stone-100 h-[50%]  flex items-center justify-center px-3 text-3xl ">
                5
              </span>
              <span className="bg-stone-300 h-[50%] flex items-center justify-center text-[17px] px-3">
                Days
              </span>
            </p>
            <p className=" w-[70px] flex flex-col justify-between  rounded-md overflow-hidden shadow-[0_0_3px_.6px] shadow-black/60">
              <span className=" bg-[#757575] h-[50%] text-sky-100  flex items-center justify-center px-3 text-3xl ">
                4
              </span>
              <span className="bg-stone-300 h-[50%] flex items-center justify-center text-[17px] px-3">
                Nights
              </span>
            </p>
          </div>
          <p className=" italic text-stone-800 mt-5 border-b border-cyan-900 pb-3">
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
                    fill="#757575"
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
                  <label className="text-stone-900">Accomodation</label>
                  <div className="value text-stone-500 text-[18px]">
                    5 Star Hotel
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Free Cancellation</label>
                  <div className="value text-stone-500 text-[18px]">
                    Yes, 10 Days before Tour start date
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Hotel Transfer</label>
                  <div className="value text-stone-500 text-[18px]">
                    Available{" "}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Language</label>
                  <div className="value text-stone-500 text-[18px]">
                    English
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Tour Availability</label>
                  <div className="value text-stone-500 text-[18px]">
                    Always Available, mostly booked 30 days in advance{" "}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Wheelchair</label>
                  <div className="value text-stone-500 text-[18px]">
                    Not wheelchair accessible
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]   md:w-[40%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Guide</label>
                  <div className="value text-stone-500 text-[18px]">
                    Partially Guided
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3 w-[100%]  md:w-[0%] lg:w-[30%] ">
                <span class="icon-holder">
                  <svg
                    fill="#757575"
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
                  <label className="text-stone-900">Maximum Age</label>
                  <div className="value text-stone-500 text-[18px]">{pax}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/*Package fare board*/}
      </div>
    );
}
