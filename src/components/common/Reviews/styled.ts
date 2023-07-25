import { styled } from "@mui/material/styles";

export const Content = styled("div")(({ theme }) => ({
  position: "relative",
  maxHeight: "auto",
  overflow: "hidden",

  "&.hidden": {
    maxHeight: 72,
  },

  "& .review": {
    color: theme.palette.text.secondary,
  }
}));

export const MoreReviewsButton = styled("button")(({ theme }) => ({
  color: theme.palette.secondary.main,

  "& svg": {
    transition: "transform 0.35s linear",
  },
  "&.up": {
    transform: "rotate(180deg)",
  },
  "&.down": {
    transform: "rotate(0deg)",
  },
}))

export const MoreTextButton= styled("button")({
  position: "absolute",
  bottom: 0,
  right: 0,
  "& .bg": {
    position: "relative",
    background: "#2C2C2C",
    "&:before": {
      content: "\"\"",
      position: "absolute",
      width: "36px",
      top: 0,
      left: "-36px",
      bottom: 0,
      background: "linear-gradient(90deg, rgba(0,0,0,0), #2C2C2C)"
    }
  },
});

export const ReviewWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: `${theme.palette.grey[600]}25`,
  borderRadius: theme.shape.borderRadius,
}));
