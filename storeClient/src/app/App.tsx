import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loader from "../features/loader/Loader";
import Header from "./layout/Header";
import { useAppDispatch } from "../store";
import { getBasketAsync } from "../store/basketSlice";

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
    Cookies.set("theme", themeMode(!darkMode));
    setDarkMode((darkMode) => !darkMode);
  };

  useEffect(() => {
    if (!Cookies.get("theme")) {
      const date = new Date();
      Cookies.set("theme", themeMode(darkMode), {
        expires: date.getFullYear() + 1,
      });
    }
    dispatch(getBasketAsync());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} handleDarkModeChange={themeHandler}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Header>
    </ThemeProvider>
  );
}

export default App;
