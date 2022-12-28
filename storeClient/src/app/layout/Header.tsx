import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Fab,
  Fade,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Toolbar,
  Typography,
  Badge,
  useScrollTrigger,
} from "@mui/material";
import { KeyboardArrowUp, ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../store";
import SignedInMenu from "./SignedInMenu";
import { TailSpin } from "react-loader-spinner";
const pages = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightMenu = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
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
  const { basket } = useAppSelector((state) => state.basket);
  const { user, status } = useAppSelector((state) => state.account);
  const itemsSum = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const ScrollTop = (props: Props) => {
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
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ color: "inherit" }}
          >
            RE-STORE
          </Typography>
          <Box>
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
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "25rem",
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page.title}
                to={page.path}
                style={{ color: "white", textDecoration: "none" }}
              >
                {page.title}
              </NavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Link to="/basket">
              <IconButton sx={{ color: "inherit" }}>
                <Badge badgeContent={itemsSum} max={100} color="secondary">
                  <ShoppingCart color="action" />
                </Badge>
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "8rem",
            }}
          >
            {status.includes("pending") ? (
              <TailSpin color="#1976d2" height="25" width="25" />
            ) : user ? (
              <SignedInMenu />
            ) : (
              rightMenu.map((menu) => (
                <NavLink
                  key={menu.title}
                  to={menu.path}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {menu.title}
                </NavLink>
              ))
            )}
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
