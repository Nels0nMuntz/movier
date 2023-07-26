import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";


export const ImdbRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: theme.palette.secondary.main,
  },
}))

export const ImdbLogo = styled("img")({
  width: "50px",
  height: "50px",
});