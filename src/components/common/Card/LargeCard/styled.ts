import { styled } from "@mui/material/styles";


export const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  height: "440px",
  [theme.breakpoints.up("sm")]: {
    height: "55vw",
  },
  [theme.breakpoints.up("md")]: {
    height: "48vw",
  },
  [theme.breakpoints.up("lg")]: {
    height: "40vw",
  },
  "&:before": {
    content: "\"\"",
    position: "absolute",
    top: 0,
    left: 0,
    width: "90%",
    height: "100%",
    background: "linear-gradient(90deg, rgb(39,40,41) 0%, rgb(39,40,41) 35%, rgba(83, 100, 141, 0) 100%)",
    zIndex: 1,
  }
}));

export const Poster = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top left",
});

export const Content = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "5%",
  left: 0,
  width: "75%",
  padding: theme.spacing(2),
  zIndex: 2,
  "& .overview": {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    lineClamp: 3,
    WebkitBoxOrient: "vertical",
  }
}));

export const Badge = styled("div")({
  position: "absolute",
  top: "5%",
  left: "5%",
  zIndex: 1,
  "& img": {
    width: "75px",
    height: "75px",
  }
});