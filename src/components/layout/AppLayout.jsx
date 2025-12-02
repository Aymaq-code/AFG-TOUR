import { Outlet } from "react-router-dom";

import Footer from "./Footer";

/**
 * Main application layout component
 * Provides consistent structure across all pages
 * - Header: Navigation and branding
 * - Main: Dynamic page content via Outlet
 * - Footer: Consistent footer across all pages
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content area - grows to fill available space */}
      <main className=" appLayout flex-1">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
