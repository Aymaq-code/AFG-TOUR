import Button from "./Button";
import Header from "./Header";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="flex flex-col items-center mt-8 sm:mt-12 md:mt-16">
        <h1 className="home__h1 tracking-[8px] sm:tracking-[10px] md:tracking-[12px] text-stone-50 text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold uppercase px-4 sm:px-6 md:px-28 text-center md:leading-20 leading-10 sm:leading-15 font-[DM_Serif_Text] text-shadow-md/30">
          Explore the Heart of{" "}
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-sky-300 text-shadow-lg/50">
            Asia
          </span>
        </h1>

        <div className="mt-8 sm:mt-12 md:mt-15 lg:mt-34">
          <Button to={"tours"} type="glass" size="lg">
            Start journey
          </Button>
        </div>
      </div>
    </div>
  );
}
