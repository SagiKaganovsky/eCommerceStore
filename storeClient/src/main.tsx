import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App";
import { loader as catalogLoader } from "./features/catalog/Catalog";
import Contact from "./features/contact/Contact";
import { loader as productLoader } from "./features/catalog/ProductDetails";
import AppBoundary from "./features/error/AppBoundary";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

const About = React.lazy(() => import("./features/about/About"));
const HomePage = React.lazy(() => import("./features/home/HomePage"));
const Catalog = React.lazy(() => import("./features/catalog/Catalog"));
const ProductDetails = React.lazy(
  () => import("./features/catalog/ProductDetails")
);
const Login = React.lazy(() => import("./features/login/Login"));
const Register = React.lazy(() => import("./features/register/Register"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <AppBoundary />,
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
        loader: productLoader,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
