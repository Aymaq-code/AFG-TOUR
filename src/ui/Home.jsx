import Button from "./Button";

export default function Home() {
  return (
    <div className="home flex flex-col justify-center items-center pt-15 fixed top-30">
      <h1 className="text-stone-50 text-5xl md:text-7xl font-semibold uppercase md:px-55 text-center md:leading-20 leading-15">
        Explore the Heart of{" "}
        <span className="text-7xl md:text-8xl tracking-[20px] ">Assia</span>
      </h1>

      <div className=" mt-31 md:mt-14 ">
        <Button type="primary">Explor now</Button>
      </div>
    </div>
  );
}
