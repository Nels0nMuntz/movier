import { styled } from "@mui/material/styles";

import texureImg from "../../../assets/img/texure.jpg";


export const Wrapper = styled("div")({
  "& .body-small": {
    display: "inline-block",
    width: "max-content",
    fontSize: "12px",
  }
});

export const Banner = styled("div")({
  position: "relative",

  "& .title": {
    lineHeight: 1.25,
    background: `url(${texureImg})`,
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  "& .description": {
    maxWidth: "560px",
  }, 
});

export const Backdrop = styled("div")<{ imageUrl: string }>(({ imageUrl }) => ({
  minHeight: "100vh",
  display: "flex",
  flexGrow: 1,
  marginTop: "-64px",
  backgroundImage: `url(${imageUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  "&:before": {
    content: "\"\"",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg,rgba(0,0,0,0.9),rgba(20,20,20,0.9) 15%,rgba(80,100,44,0))",
    zIndex: 0,
  }
}));

export const Poster = styled("img")({
  maxWidth: "500px",
  margin: "0 auto",
});