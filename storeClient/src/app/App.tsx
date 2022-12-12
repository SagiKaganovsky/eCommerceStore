import { createTheme, ThemeProvider } from "@mui/material";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Catalog from "../features/catalog/Catalog";
import Loader from "../features/loader/Loader";
import Header from "./layout/Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header
        darkMode={darkMode}
        handleDarkModeChange={() => setDarkMode((darkMode) => !darkMode)}
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Header>
    </ThemeProvider>
  );
}

export default App;
