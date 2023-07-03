import { styled } from "@mui/material/styles";

export const NavButton = styled("button")<{ prev?: boolean, next?: boolean }>(({ prev, next }) => ({
  position: "absolute",
  top: "50%",
  left: `${prev ? "24px" : "auto"}`,
  right: `${next ? "24px" : "auto"}`,
  transform: "translateY(-50%)",
  zIndex: 1,
}));