import { Box, Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { headerData } from "../constants";
import styles from "../header.module.scss";
import cn from "classnames";

export const NavLinks = () => {
  const location = useLocation();

  return (
    <Box className={styles.navLinks}>
      {headerData.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Button
            key={link.name}
            sx={{
              color: isActive ? "white" : "#b6b6b6",
            }}
            startIcon={<link.icon />}
          >
            <NavLink
              to={link.path}
              className={cn(styles.navLink, {
                [styles.isActive]: isActive,
              })}
            >
              {link.name}
            </NavLink>
          </Button>
        );
      })}
    </Box>
  );
};
