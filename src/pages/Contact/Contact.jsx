import Header from "../../components/layout/Header";

export default function Contact() {
  return (
    <>
      <Header />
      <div
        id="contact-section"
        className=" uppercase pt-8 sm:pt-12 md:pt-25 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6">
        <h2
          className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-[2px] sm:tracking-[3px] ml-0 sm:ml-4 md:ml-34 
             bg-gradient-to-r from-emerald-900 to-emerald-500 
             bg-clip-text text-transparent inline-block">
          Contact us
        </h2>

        <div className="my-4 mx-auto max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10 flex-wrap text-emerald-300">
          <div className="bg-black/30 backdrop-blur-sm shadow-xl p-4 sm:p-5 w-full lg:w-[45%] rounded-2xl self-start">
            <h2 className="text-xl sm:text-2xl mb-4">Get in touch</h2>
            <hr className="text-emerald-300" />
            <form className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 md:gap-10 mt-4 sm:mt-5 md:mt-7">
              <div className="flex flex-col gap-1 w-full sm:w-[50%]">
                <label className="font-semibold text-sm sm:text-base">
                  Name
                </label>
                <input
                  className="border text-emerald-300 p-2 rounded-[7px] outline-none placeholder:text-emerald-300 placeholder:font-light text-sm sm:text-base"
                  type="text"
                  placeholder="Enter your name*"
                />
              </div>
              <div className="flex flex-col gap-1 w-full sm:w-[50%]">
                <label className="font-semibold text-sm sm:text-base">
                  Phone number
                </label>
                <input
                  className="border text-emerald-300 p-2 rounded-[7px] outline-none placeholder:text-emerald-300 placeholder:font-light text-sm sm:text-base"
                  type="number"
                  placeholder="Enter your phone number*"
                />
              </div>
            </form>
            <div className="mt-6 sm:mt-8 font-semibold">
              <h2 className="text-sm sm:text-base">Your Message</h2>
              <textarea
                className="border-1 font-light border-emerald-300 text-white p-3 outline-none w-full mt-1 rounded-[7px] placeholder:text-emerald-300 text-sm sm:text-base"
                placeholder="Type your message..."></textarea>
            </div>
            <div className="mt-4">
              <button className="uppercase block w-full sm:w-auto px-4 sm:px-7 py-2 rounded-sm cursor-pointer text-emerald-50 text-lg sm:text-xl font-semibold bg-emerald-700 transition-all duration-300 hover:bg-emerald-800 hover:translate-y-1">
                send message
              </button>
            </div>
          </div>
          <div className="w-full lg:w-[45%] flex flex-col gap-4 sm:gap-6 self-start shadow-xl">
            <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-5 rounded-2xl">
              <h2 className="text-xl sm:text-2xl mb-4">Contact information</h2>
              <hr className="text-emerald-300" />
              <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4 sm:gap-6 md:gap-7 mt-6 sm:mt-8 md:mt-10">
                <h3 className="flex gap-1.5 flex-col">
                  <span className="text-sm sm:text-base"> 📞 Phone</span>
                  <span className="text-xs sm:text-sm text-emerald-100">
                    +93 708 760 475
                  </span>
                </h3>
                <h3 className="flex gap-1.5 flex-col">
                  <span className="text-sm sm:text-base">🗺️ Address</span>
                  <span className="text-xs sm:text-sm text-emerald-100">
                    Afghanistan, Kabul, shahri-now
                  </span>
                </h3>
                <h3 className="flex gap-1.5 flex-col">
                  <span className="text-sm sm:text-base">📧 Email</span>
                  <span className="text-xs sm:text-sm text-emerald-100">
                    rashidaymaq1994@gmail.com
                  </span>
                </h3>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm shadow-xl p-4 sm:p-5 rounded-2xl">
              <h2 className="text-xl sm:text-2xl mb-4">Business hours</h2>
              <hr className="text-emerald-300" />
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-20">
                <h3 className="flex flex-col">
                  <span className="text-sm sm:text-base">Monday-friday</span>
                  <span className="text-xs sm:text-sm text-emerald-100 mt-1">
                    09:00am-08:00pm
                  </span>
                </h3>
                <h3 className="flex flex-col">
                  <span className="text-sm sm:text-base">Saturday</span>
                  <span className="text-xs sm:text-sm text-emerald-100 mt-1">
                    09:00am-06:00pm
                  </span>
                </h3>
                <h3 className="flex flex-col">
                  <span className="text-sm sm:text-base">sunday</span>
                  <span className="text-xs sm:text-sm text-emerald-100 mt-1">
                    09:00am-05:00pm
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <iframe
            className="iframe h-64 sm:h-80 md:h-100 w-full rounded-[7px] mt-8 sm:mt-12 md:mt-15"
            src="https://maps.google.com/maps?q=34.5328622,69.1653065&z=15&output=embed"
            title="location"
            width="100%"
            height="751"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  );
}
