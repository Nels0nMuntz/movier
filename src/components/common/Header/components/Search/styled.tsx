import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import { Typography } from "components";
import { Props } from "components/common/Typography/Typography";


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
      width: "20ch",
      // "&:focus": {
      //   width: "20ch",
      // },
    },
  },
}));

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-start"  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "22vw",
    padding: `${theme.spacing(2)}`,
    backgroundColor: theme.palette.custom.bg.tooltip?.main,
    boxShadow: theme.shadows[1],
    borderRadius: 0,
  },
}));

export const SearchList = styled("ul")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
}));

export const SearchFooter = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",

  "& .more-button": {
    color: theme.palette.secondary.main,
  },
}));

export const SearchLink = styled(Link)(({ theme }) => ({
  "& span": {
    color: theme.palette.secondary.main,
  },
}));

export const SearchHeading = styled((props: Props) => (
  <Typography {...props}/>
))(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))
