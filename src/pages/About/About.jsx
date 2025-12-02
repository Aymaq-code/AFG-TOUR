import IMG_2 from "../../../public/app_images/pexels-poli-godoy-3660947-5477879.jpg";
import Header from "../../components/layout/Header";
export default function About() {
  return (
    <>
      <Header />
      <div
        id="about-section"
        className="  min-h-screen flex flex-col md:flex-row-reverse items-center justify-center gap-8 sm:gap-12 md:gap-25 font-sans py-8 sm:py-12 md:py-4 px-4 sm:px-6 md:px-[30px]">
        <div className="w-full md:w-[40%] md:pl-10 text-stone-50 ">
          <h1 className=" text-stone-700 text-2xl sm:text-3xl md:text-4xl leading-8 sm:leading-10 md:leading-[45px] font-semibold mb-4 sm:mb-6 tracking-[1px] sm:tracking-[2px] pr-70 md:pr-80">
            Learn more about our {""}
            <span className="bg-linear-to-r from-lime-200 to-lime-400 bg-clip-text text-transparent">
              missions
            </span>
            <div className="flex gap-1">
              <span className="w-4 h-1 mt-2 bg-linear-to-r from-lime-300 to-lime-400 rounded-full"></span>
              <span className="w-9 block mt-2 bg-linear-to-r from-lime-300 to-lime-600 rounded-full"></span>
            </div>
          </h1>

          <p className=" text-black/80 text-sm sm:text-base md:text-[17px] text-justify tracking-[1px] sm:tracking-[1.5px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut atque
            dolores corporis reiciendis sed, porro, iusto molestiae vitae
            commodi iure mollitia fuga harum odit magni reprehenderit deleniti
            doloremque similique consequatur. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
          </p>
        </div>
        <div className="w-full md:w-[35%] relative flex mt-8 sm:mt-12 md:mt-25">
          <span className="aboutImg1 shadow-xl"></span>
          <img className="aboutImg2 shadow-xl" src={IMG_2} alt="img" />
        </div>
      </div>
    </>
  );
}
