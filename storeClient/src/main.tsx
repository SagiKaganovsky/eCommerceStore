import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/layout/App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import About from "./features/about/About";
import Catalog, { loader as catalogLoader } from "./features/catalog/Catalog";
import HomePage from "./features/home/HomePage";
import Contact from "./features/contact/Contact";
import ProductDetails from "./features/catalog/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
        loader: catalogLoader,
      },
      {
        path: "/catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
