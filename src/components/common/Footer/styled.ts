import { styled } from "@mui/material/styles";

export const Wrapper = styled("footer")(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  backgroundColor: "#272829"
}))

export const LogoImg = styled("img")({
  width: "36px",
});