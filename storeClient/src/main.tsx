import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { loader as catalogLoader } from "./features/catalog/Catalog";
import { loader as productLoader } from "./features/catalog/ProductDetails";
import App from "./app/App";
import AppBoundary from "./features/error/AppBoundary";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { StoreProvider } from "./store/storeContext";

const About = React.lazy(() => import("./features/about/About"));
const HomePage = React.lazy(() => import("./features/home/HomePage"));
const Catalog = React.lazy(() => import("./features/catalog/Catalog"));
const ProductDetails = React.lazy(
  () => import("./features/catalog/ProductDetails")
);
const Login = React.lazy(() => import("./features/login/Login"));
const Register = React.lazy(() => import("./features/register/Register"));
const Contact = React.lazy(() => import("./features/contact/Contact"));
const BasketPage = React.lazy(() => import("./features/basket/BasketPage"));
const CheckoutPage = React.lazy(
  () => import("./features/checkout/CheckoutPage")
);

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
      {
        path: "/basket",
        element: <BasketPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <StoreProvider>
    <RouterProvider router={router} />{" "}
  </StoreProvider>
);
