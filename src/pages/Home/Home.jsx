import Header from "../../components/layout/Header";
import Button from "../../components/common/Button";

/**
 * Home Page Component
 * Landing page with hero section and call-to-action
 */
export default function Home() {
  return (
    <div className=" bg-[url('/afg_img/BIN/BIN-7.jpg')] bg-no-repeat bg-cover bg-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header with navigation */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 sm:pt-24 md:pt-11 px-4">
        {/* Main Heading */}
        <h1 className="text-center font-[DM_Serif_Text] font-semibold uppercase tracking-[10px] text-stone-50 text-shadow-md/30">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Explore the Heart of
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-sky-300 text-shadow-lg/50 mt-2">
            Asia
          </span>
        </h1>

        {/* Call-to-Action Button */}
        <div className="mt-16 sm:mt-12 md:mt-20 lg:mt-34">
          <Button to="/tours" type="glass" size="lg">
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
