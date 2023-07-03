import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


export const Wrapper = styled("div")({
  "&:hover": {
    "& img": {
      transform: "scale(1.1)",
    },
    "& .actions": {
      transform: "translateY(0)",
    }
  }
});

export const Poster = styled("div")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "auto",
    maxHeight: "408px",
    transformOrigin: "50%",
    transition: "transform 0.3s ease-out"
  },
  "& .actions": {
    position: "absolute",
    top: 0,
    right: 0,
    padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
    transform: "translateY(-100%)",
    backgroundColor: theme.palette.secondary.main,
    transition: "transform 0.3s ease-out"
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textTransform: "uppercase",
  "&:hover span": {
    color: theme.palette.secondary.main,
    transition: "color 0.15s linear",
  }
}));

export const Action = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  transition: "box-shadow 0.15s linear",
  "&:hover": {
    boxShadow: "0 0 10px #000 inset, 0 0 0 3px #fff",
  }
}))