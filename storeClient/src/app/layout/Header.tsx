import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Fab,
  Fade,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const pages = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
  darkMode: boolean;
  handleDarkModeChange: () => void;
}
const Header: React.FC<Props> = (props) => {
  function ScrollTop(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector("#back-to-top-anchor");

      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            RE-STORE
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink to={page.path}>{page.title}</NavLink>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.darkMode}
                    onChange={props.handleDarkModeChange}
                    aria-label="Dark Light mode switch"
                  />
                }
                label={props.darkMode ? "Dark" : "Light"}
              />
            </FormGroup>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 4, width: "100%" }}>{props.children}</Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Header;
