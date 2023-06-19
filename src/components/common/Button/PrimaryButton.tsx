import { styled } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";
import { Typography } from "../Typography/Typography";


interface Props extends PropsWithChildren {
  icon?: React.ReactNode;
}

export const StyledButton = styled("button")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  background: theme.palette.secondary.main,
  "& *": {
    position: "relative",
    zIndex: 1,
  },
  "&:before": {
    position: "absolute",
    content: "\"\"",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#333",
    transition: "transform 0.3s ease-out",
    transform: "scaleX(0)",
    transformOrigin: "0 50%",
  },
  "&:hover": {
    background: theme.palette.common.black,
    "&:before": {
      transform: "scaleX(1)",
    }
  }
}));

export const PrimaryButton: FC<Props> = ({ icon, children }) => {
  return (
    <StyledButton>
      {icon}
      {children && (
        <Typography element="span" type="body_1">
          {children}
        </Typography>
      )}
    </StyledButton>
  )
};