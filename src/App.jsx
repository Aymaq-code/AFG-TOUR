import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Tour, { loader as tourLoader } from "./features/tour/Tour";
import Error from "./ui/Error";

import Payment from "./features/cart_vs1/Payment";
import TourFullDetails, {
  loader as fullDetailsLoader,
} from "./ui/TourFullDetails";

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tours",
        element: <Tour />,
        loader: tourLoader,
        errorElement: <Error />,
      },
      {
        path: "/tourFullDetails/:tourId",
        element: <TourFullDetails />,
        loader: fullDetailsLoader,
      },

      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
