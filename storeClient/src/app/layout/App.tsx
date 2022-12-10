import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

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
        <Catalog />
      </Header>
    </ThemeProvider>
  );
}

export default App;
