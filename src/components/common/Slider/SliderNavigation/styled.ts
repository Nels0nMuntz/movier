import { styled } from "@mui/material/styles";

export const NavButton = styled("button")<{ prev?: boolean, next?: boolean }>(({ prev, next, theme }) => ({
  position: "absolute",
  top: "50%",
  left: `${prev ? "0px" : "auto"}`,
  right: `${next ? "0px" : "auto"}`,
  transform: "translateY(-50%)",
  zIndex: 1,
  [theme.breakpoints.up("768")]: {
    left: `${prev ? "24px" : "auto"}`,
    right: `${next ? "24px" : "auto"}`,
  }
}));