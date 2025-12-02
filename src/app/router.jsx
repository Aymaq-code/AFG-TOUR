// router.jsx
import { createHashRouter, RouterProvider } from "react-router-dom";
// Layout
import AppLayout from "../components/layout/AppLayout";
// Pages
import Home from "../pages/Home/Home";
import Tours from "../pages/Tours/Tours";
import TourDetails from "../pages/TourDetails/TourDetails";
import Payment from "../pages/Payment/Payment";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Registration from "../pages/Registration/Registration";
// Error Boundary
import Error from "../components/common/Error";
// Loaders
import { loader as toursLoader } from "../pages/Tours/toursLoader";
import { loader as tourDetailsLoader } from "../pages/TourDetails/tourDetailsLoader";

const router = createHashRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/tours", element: <Tours />, loader: toursLoader },
      {
        path: "/tours/:tourId",
        element: <TourDetails />,
        loader: tourDetailsLoader,
      },
      { path: "/payment", element: <Payment /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/registration", element: <Registration /> },
    ],
  },
]);

export default router;
