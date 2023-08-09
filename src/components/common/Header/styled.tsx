import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";

export const AppHeader = styled(AppBar)(() => ({
  zIndex: 2,
  "&.transparent": {
    backgroundColor: "#14141480",
    backdropFilter: "blur(10px)",
  }
}))

export const LogoImg = styled("img")({
  width: "36px",
});

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
  "& a, & button": {
    color: theme.palette.text.primary,
    textTransform: "uppercase",
    "&:hover span": {
      color: theme.palette.secondary.main,
      transition: "color 0.2s linear",
    }
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  "& svg path": {
    fill: theme.palette.common.white,
  },
}));

export const ListItem = styled("div")(({ theme }) => ({
  "& a": {
    position: "relative",
    display: "block",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    "& span": {
      position: "relative",
      zIndex: 1,
    },
    "&:before, &:after": {
      opacity: 0,
      transition: "opacity 0.15s linear",
    },
    "&:hover": {      
      "&:before": {
        content: "\"\"",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
      },
      "&:after": {
        content: "\"\"",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(90deg, ${alpha(theme.palette.secondary.main, 0.35)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
        opacity: 1,
      },
    },
  }
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "120px",
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#141414",
    transition: "background-color 0.125s linear",
  },
}));
