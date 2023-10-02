import { styled } from "@mui/material/styles";

export const InfoGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(2),
  [theme.breakpoints.up("768")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  }
}));
