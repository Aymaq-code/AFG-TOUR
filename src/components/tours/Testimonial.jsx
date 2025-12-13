import { useAnimation } from "../../utils/useAnimation";

import ClienImg_1 from "../../../public/app_images/client_1.jpg";
import ClienImg_2 from "../../../public/app_images/client_2.jpg";
import ClienImg_3 from "../../../public/app_images/client_3.jpg";

function Testimonial() {
  const { registerOnce } = useAnimation();

  return (
    <div className=" py-40 md:py-60 lg:py-20 px-5 md:px-20 lg:px-35 lg:mt-1 ">
      {/*Head Titles*/}
      <div className="text-center w-full">
        <h2
          ref={registerOnce}
          className=" animate-once_card testimonial text-blue-800 font-bold mb-2 lg:mb-3">
          Testimonial
        </h2>

        <h2
          ref={registerOnce}
          className=" animate-once_card think_A text-stone-800 font-bold text-2xl lg:text-3xl lg-8 mb-7 md:mb-12 lg:mb-20">
          What The People Thinks About Us
        </h2>
      </div>

      {/*Comment Container*/}
      <div className=" flex lg:gap-8 flex-col lg:flex-row gap-4  ">
        {/*Cart1*/}
        <div
          ref={registerOnce}
          className=" animate-once_card  card_1_A flex-1 px-5 py-8 rounded-2xl cursor-pointer transition-all duration-300 shadow-black/10 hover:shadow-[0_0_30px_20px] ">
          {/*Cart Head*/}
          <div className=" flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0.5 ">
            <img src={ClienImg_1} alt="client image" className="rounded-full" />
            <div className="text-center">
              <h2 className="font-black text-stone-900">Agueda Scoggins</h2>
              <p className="text-stone-500">one year with us</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56.181"
              height="42.358"
              viewBox="0 0 56.181 42.358">
              <path
                d="M56.181,42.359H35.224a39.528,39.528,0,0,1-3.344-8.992,42.088,42.088,0,0,1-1.115-9.736,30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58A16.709,16.709,0,0,1,43.12,1.672,27.023,27.023,0,0,1,53.06,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487h10.85V42.358Zm-30.766,0H4.459a39.5,39.5,0,0,1-3.344-8.992A42.094,42.094,0,0,1,0,23.631a30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58,16.709,16.709,0,0,1,6.929-5.016A27.023,27.023,0,0,1,22.294,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487H25.415V42.358Z"
                fill="#193cb8"></path>
            </svg>
          </div>
          {/*Body*/}
          <p className=" mt-3 md:mt-4 px-4 text-gray-600">
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
        {/*Cart2*/}
        <div
          ref={registerOnce}
          className=" animate-once_card  card_2_A flex-1 px-5 py-8 rounded-2xl cursor-pointer transition-all duration-300 shadow-black/10 hover:shadow-[0_0_30px_20px] ">
          {/*Cart Head*/}
          <div className=" flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0.5 ">
            <img src={ClienImg_3} alt="client image" className="rounded-full" />
            <div>
              <h2 className="font-black text-stone-900">Marilou Henley</h2>
              <p className="text-stone-500">one year with us</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56.181"
              height="42.358"
              viewBox="0 0 56.181 42.358">
              <path
                d="M56.181,42.359H35.224a39.528,39.528,0,0,1-3.344-8.992,42.088,42.088,0,0,1-1.115-9.736,30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58A16.709,16.709,0,0,1,43.12,1.672,27.023,27.023,0,0,1,53.06,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487h10.85V42.358Zm-30.766,0H4.459a39.5,39.5,0,0,1-3.344-8.992A42.094,42.094,0,0,1,0,23.631a30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58,16.709,16.709,0,0,1,6.929-5.016A27.023,27.023,0,0,1,22.294,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487H25.415V42.358Z"
                fill="#193cb8"></path>
            </svg>
          </div>
          {/*Body*/}
          <p className=" mt-3 md:mt-4 px-4 text-gray-600">
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
        {/*Cart3*/}
        <div
          ref={registerOnce}
          className=" animate-once_card card_3_A flex-1 px-5 py-8 rounded-2xl cursor-pointer transition-all duration-300 shadow-black/10 hover:shadow-[0_0_30px_20px] ">
          {/*Cart Head*/}
          <div className=" flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0.5 ">
            <img src={ClienImg_2} alt="client image" className="rounded-full" />
            <div>
              <h2 className="font-black text-stone-900">Pat Zook</h2>
              <p className="text-stone-500">one year with us</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56.181"
              height="42.358"
              viewBox="0 0 56.181 42.358">
              <path
                d="M56.181,42.359H35.224a39.528,39.528,0,0,1-3.344-8.992,42.088,42.088,0,0,1-1.115-9.736,30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58A16.709,16.709,0,0,1,43.12,1.672,27.023,27.023,0,0,1,53.06,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487h10.85V42.358Zm-30.766,0H4.459a39.5,39.5,0,0,1-3.344-8.992A42.094,42.094,0,0,1,0,23.631a30.73,30.73,0,0,1,1.356-9.363,23.2,23.2,0,0,1,4.069-7.58,16.709,16.709,0,0,1,6.929-5.016A27.023,27.023,0,0,1,22.294,0V9.364h-.008c-2.659,0-4.632.6-5.863,1.783s-1.858,3.483-1.858,6.836v1.487H25.415V42.358Z"
                fill="#193cb8"></path>
            </svg>
          </div>
          {/*Body*/}
          <p className=" mt-3 md:mt-4 px-4 text-gray-600">
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Testimonial;
