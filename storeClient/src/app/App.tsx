import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loader from "../features/loader/Loader";
import { useStoreContext } from "../store/storeContext";
import Header from "./layout/Header";
import api from "./utils/api";
import { Basket } from "./models/basket";

const themeMode = (mode: boolean) => (mode ? "dark" : "light");

function App() {
  const storeCtx = useStoreContext();
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

  const basketHandler = async () => {
    const buyerId = Cookies.get("buyerId");
    if (buyerId) {
      const data = (await api.Basket.get()) as Basket;
      storeCtx?.setBasket(data);
    }
  };

  useEffect(() => {
    basketHandler();
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
