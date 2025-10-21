import { Outlet } from "react-router-dom";
import Header from "./Header";
import Tours from "./Tours";

export default function AppLayout() {
  return (
    <div className="appLayout overflow-x-auto">
      <Header />
      <div>
        <main className="overflow-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
