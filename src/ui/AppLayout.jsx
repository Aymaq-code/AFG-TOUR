import { Outlet } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="appLayout">
      <div>
        <main className="">
          <Outlet />
        </main>
      </div>
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
