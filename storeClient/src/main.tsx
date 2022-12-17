import React from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app/App";
import AppBoundary from "./features/error/AppBoundary";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
