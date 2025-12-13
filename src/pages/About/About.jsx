import IMG_2 from "../../../public/app_images/abouImage_1.webp";
import Header from "../../components/layout/Header";
export default function About() {
  return (
    <>
      <div className=" bg-[#757575] shadow-black/80 shadow-[0_0_9px_3px]">
        <Header />
      </div>

      <div
        id="about-section"
        className=" min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center gap-5 lg:gap-25 font-sans lg:mt-1 md:mt-10  lg:py-4 px-8 md:px-10 lg:px-20">
        <div className=" w-full text-stone-50 ">
          <h1 className=" headTittle capitalize text-stone-700 text-2xl sm:text-3xl md:text-4xl leading-8 sm:leading-10 md:leading-[45px] font-semibold mb-4 sm:mb-6 tracking-[1px] sm:tracking-[2px] ">
            Learn more about our
            <br />
            <span className="bg-linear-to-r from-lime-200 to-lime-400 bg-clip-text text-transparent">
              missions
            </span>
            <div className="flex gap-1">
              <span className="w-4 h-1 mt-2 bg-linear-to-r from-lime-300 to-lime-400 rounded-full"></span>
              <span className="w-9 block mt-2 bg-linear-to-r from-lime-300 to-lime-600 rounded-full"></span>
            </div>
          </h1>

          <p className=" bodyParagraph text-black/80 text-sm sm:text-base md:text-[17px] text-justify tracking-[1px] sm:tracking-[1.5px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut atque
            dolores corporis reiciendis sed, porro, iusto molestiae vitae
            commodi iure mollitia fuga harum odit magni reprehenderit deleniti
            doloremque similique consequatur. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
          </p>
        </div>
        <div className=" w-full relative flex mt-8 sm:mt-12 md:mt-25">
          <span className="aboutImg1 shadow-xl"></span>
          <img className="aboutImg2 shadow-xl" src={IMG_2} alt="img" />
        </div>
      </div>
    </>
  );
}
