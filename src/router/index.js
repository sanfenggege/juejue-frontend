import Index from '../container/Index';
import About from '../container/About';
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default routes;