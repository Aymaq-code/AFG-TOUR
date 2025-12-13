import { useDispatch, useSelector } from "react-redux";
import LOC_SVG from "../../../public/svgs/location-pin-alt-1-svgrepo-com.svg";
import CIRCLE_SVG from "../../../public/svgs/circle-dashed-svgrepo-com.svg";
import Arrow_SVG from "../../../public/svgs/airplane-svgrepo-com.svg";
import { toggleExpandAll, toggleExpandDay } from "../Tours/tourSlice";

export default function Itinerary() {
  const dispatch = useDispatch();
  const { expandedDays } = useSelector((state) => state.tour);

  const {
    all: isExpandedAll,
    day1: isExpandedDay1,
    day2: isExpandedDay2,
    day3: isExpandedDay3,
    day4: isExpandedDay4,
    day5: isExpandedDay5,
  } = expandedDays;

  const days = [
    {
      day: 1,
      title: "Arrival & Optional Experiences",
      expanded: isExpandedDay1,
      icon: LOC_SVG,
    },
    {
      day: 2,
      title:
        "Deluxe Hot Air Balloon Adventure & Burj Khalifa Premium Experience",
      expanded: isExpandedDay2,
      icon: CIRCLE_SVG,
    },
    {
      day: 3,
      title: "Old Dubai Heritage Tour & Premium Red Dunes Desert Safari",
      expanded: isExpandedDay3,
      icon: CIRCLE_SVG,
    },
    {
      day: 4,
      title: "Fully Customizable Dubai Experiences",
      expanded: isExpandedDay4,
      icon: CIRCLE_SVG,
    },
    {
      day: 5,
      title: "Departure? or Extended stay",
      expanded: isExpandedDay5,
      icon: LOC_SVG,
    },
  ];

  return (
    <section id="itinerary">
      <div className="flex justify-between items-center">
        <h2 className="text-stone-900 text-3xl font-semibold tracking-wider pt-17 pb-11">
          Itinerary
        </h2>
        <div className="flex items-center gap-3 select-none">
          <span
            className={`text-stone-800 ${isExpandedAll ? "opacity-60" : ""}`}>
            Expand all
          </span>
          <button
            onClick={() => dispatch(toggleExpandAll())}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 
              ${isExpandedAll ? "bg-[#616161]" : "bg-[#607D8B]"}`}>
            <span
              className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 
                ${isExpandedAll ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>

      {days.map((dayData) => (
        <div key={dayData.day}>
          <div className="flex flex-col justify-center">
            <div
              className="flex items-center justify-between hover:bg-[#78909C] cursor-pointer p-2"
              onClick={() => dispatch(toggleExpandDay(dayData.day))}>
              <h2 className="text-stone-900 text-xl flex items-center gap-3">
                <img
                  src={dayData.icon}
                  alt="day icon"
                  className={
                    dayData.day === 1 || dayData.day === 5
                      ? "h-12 bg-stone-800 rounded-full"
                      : "h-6 rounded-full"
                  }
                />
                Day {dayData.day} : {dayData.title}
              </h2>
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleExpandDay(dayData.day));
                }}
                src={Arrow_SVG}
                alt="arrow icon"
                className={
                  dayData.expanded
                    ? "h-7 cursor-pointer rotate-180 transition-all duration-500"
                    : "rotate-0 h-7"
                }
              />
            </div>

            {dayData.expanded && (
              <div className="self-end w-[93%]">
                <p>Day {dayData.day} content</p>
              </div>
            )}
          </div>
          <hr className="text-stone-400 mt-5 w-[90%] ml-17" />
        </div>
      ))}

      <hr className="border-[1px] border-stone-300 my-13" />
    </section>
  );
}
