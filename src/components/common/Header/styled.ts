import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AppBar from "@mui/material/AppBar";

export const AppHeader = styled(AppBar)(() => ({
  zIndex: 1,
  "&.transparent": {
    backgroundColor: "#14141480",
    backdropFilter: "blur(10px)",
  }
}))

export const LogoImg = styled("img")({
  width: "36px",
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  color: theme.palette.text.primary,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Nav = styled("nav")(({ theme }) => ({
  flexGrow: 1,
  "& ul": {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  "& li": {
    position: "relative",
    marginLeft: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    "&:before": {
      content: "\"\"",
      position: "absolute",
      left: 0,
      top: "50%",
      width: "1px",
      height: "20px",
      background: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-50%)"
    }
  },
  "& a": {
    color: theme.palette.text.primary,
    textTransform: "uppercase",
    "&:hover span": {
      color: theme.palette.secondary.main,
      transition: "color 0.2s linear",
    }
  },
}))