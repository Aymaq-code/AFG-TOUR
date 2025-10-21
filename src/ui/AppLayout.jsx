import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="appLayout ">
      <div>
        <Header />
        <main className="overflow-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
