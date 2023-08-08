import { styled } from "@mui/material/styles";

export const Item = styled("li")(({ theme }) => ({
  "&:not(:last-child)": {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #1f1f1f",
  },

  "& .grid": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(3),
  },

  "& .img-link": {
    flexShrink: 0,
  },

  "& img": {
    width: "92px",
    height: "60px",    
    borderRadius: theme.shape.borderRadius,
    objectFit: "cover",
    objectPosition: "center",
  },

  "& .content": {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)} ${theme.spacing(0.5)} 0`
  },

  "& .title": {
    overflow: "hidden",
    textOverflow: "ellipses",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    lineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
}));