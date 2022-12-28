import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loader from "../features/loader/Loader";
import Header from "./layout/Header";
import { useAppDispatch } from "../store";
import { fetchBasketAsync } from "../store/basketSlice";
import { fetchCurrentUser } from "../store/accountSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const themeMode = (mode: boolean) => (mode ? "dark" : "light");

function App() {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(Cookies.get("theme") === "dark");
  const theme = createTheme({
    palette: {
      mode: themeMode(darkMode),
    },
  });

  const themeHandler = () => {
    const date = new Date();
    Cookies.set("theme", themeMode(!darkMode), {
      expires: date.getFullYear() + 1,
    });
    setDarkMode((darkMode) => !darkMode);
  };

  useEffect(() => {
    if (!Cookies.get("theme")) {
      const date = new Date();
      Cookies.set("theme", themeMode(darkMode), {
        expires: date.getFullYear() + 1,
      });
    }
    dispatch(fetchBasketAsync());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} handleDarkModeChange={themeHandler}>
        <Suspense fallback={<Loader />}>
          <Outlet />
          <ToastContainer />
        </Suspense>
      </Header>
    </ThemeProvider>
  );
}

export default App;
