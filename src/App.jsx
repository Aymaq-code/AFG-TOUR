import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { ScrollAnimationProvider } from "./utils/ScrollAnimationContext";

function App() {
  return (
    <ScrollAnimationProvider>
      <RouterProvider router={router} />
    </ScrollAnimationProvider>
  );
}

export default App;
