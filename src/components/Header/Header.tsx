import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { NavLinks } from "./NavLinks";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: "32px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLinks />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
