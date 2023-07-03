import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react"
import { Typography } from "../Typography/Typography"


const Wrap = styled("div")(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(5),
  textTransform: "uppercase",
  "&:before": {
    content: "\"\"",
    position: "absolute",
    left: 0,
    bottom: "-12px",
    width: "50px",
    height: "3px",
    backgroundColor: theme.palette.secondary.main,
  }
}))

export const SectionTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrap>
      <Typography element="h2" type="heading_4">{children}</Typography>
    </Wrap>
  )
};
