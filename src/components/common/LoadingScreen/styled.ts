import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";


const spin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

export const Wrapper = styled("div")<{ visible: boolean }>(({ theme, visible }) => ({
  "& .loader-wrapper": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
    ...!visible && {
      visibility: "hidden",
      transform: "translateY(-100%)",
      transition: "all 0.3s 1s ease-out",
    }
  },
  "& .loader": {
    position: "relative",
    top: "50%",
    left: "50%",
    width: 150,
    height: 150,
    margin: "-75px 0 0 -75px",
    borderRadius: "50%",
    border: "3px solid transparent",
    borderTopColor: theme.palette.secondary.main,
    animation: `${spin} 2s linear infinite`,
    zIndex: 1001,
    ...!visible && {
      opacity: 0,
      transition: "all 0.3s ease-out",
    },
    "&:before": {
      content: "\"\"",
      position: "absolute",
      top: 5,
      left: 5,
      right: 5,
      bottom: 5,
      borderRadius: "50%",
      border: "3px solid transparent",
      borderTopColor: "#333",
      animation: `${spin} 3s linear infinite`,
    },
    "&:after": {
      content: "\"\"",
      position: "absolute",
      top: 15,
      left: 15,
      right: 15,
      bottom: 15,
      borderRadius: "50%",
      border: "3px solid transparent",
      borderTopColor: "#fff",
      animation: `${spin} 1.5s linear infinite`,
    },
  },
  "& .loader-section": {
    position: "fixed",
    top: 0,
    width: "51%",
    height: "100%",
    backgroundColor: "#222",
    zIndex: 1000,
    transform: "translateX(0)",
    transition: "all 0.7s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    "&.loader-section--left": {
      left: 0,
      ...!visible && {
        transform: "translateX(-100%)",
      }
    },
    "&.loader-section--right": {
      right: 0,
      ...!visible && {
        transform: "translateX(100%)",
      }
    },
  },
}));