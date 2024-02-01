import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import styles from "./footer.module.scss";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        marginTop: "32px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href="https://github.com/maryanmats"
            target="_blank"
            className={styles.footerLink}
          >
            <GitHubIcon /> Github
          </a>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
