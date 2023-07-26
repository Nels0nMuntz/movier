import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { Link as RRDLink } from "react-router-dom";


import texureImg from "../../../assets/img/texure.jpg"

const slide = keyframes`
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Wrapper = styled("div")({
  "& .body-small": {
    fontSize: "12px",
  }
});

export const Banner = styled("div")({
  position: "relative",

  "& .description": {
    maxWidth: "560px",
  },
  "& .title": {
    lineHeight: 1.25,
    background: `url(${texureImg})`,
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  "& .slide-1": {
    animation: `${slide} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.6s both`
  },
  "& .slide-2": {
    animation: `${slide} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.7s both`
  },
  "& .slide-3": {
    animation: `${slide} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.8s both`
  },
  "& .slide-4": {
    animation: `${slide} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.9s both`
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
})

export const Link = styled(RRDLink)(({ theme }) => ({
  padding: `${theme.spacing(0.25)} ${theme.spacing(0.8)}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.grey[800]}90`,
  "&:hover": {
    backgroundColor: `${theme.palette.grey[800]}`,
  }
}))