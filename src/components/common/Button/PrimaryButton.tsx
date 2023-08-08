import { styled } from "@mui/material/styles";
import React, { FC, PropsWithChildren } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { Typography } from "../Typography/Typography";


interface Props extends PropsWithChildren {
  fluid?: boolean;
  icon?: React.ReactNode;
  title?: string;
  alignCenter?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled("button")<{ fluid?: boolean, alignCenter?: boolean }>(({ theme, fluid, alignCenter }) => ({
  position: "relative",
  minWidth: "136px",
  display: "flex",
  alignItems: "center",
  justifyContent: `${alignCenter ? "center" : "initial"}`,
  gap: theme.spacing(1),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  background: theme.palette.secondary.main,
  boxSizing: "border-box",
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
    pointerEvents: "none",
  },
  "&:hover": {
    background: theme.palette.common.black,
    "&:before": {
      transform: "scaleX(1)",
    }
  },
  ...fluid && {
    width: "100%",
    justifyContent: "center",
  },
}));

export const PrimaryButton: FC<Props> = ({ icon, fluid, children, title, alignCenter, isLoading, onClick }) => {
  return (
    <StyledButton
      fluid={fluid}
      onClick={onClick}
      title={title}
      alignCenter={alignCenter}
    >
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <React.Fragment>
          {icon}
          {children && (
            <Typography element="span" type="body_1">
              {children}
            </Typography>
          )}
        </React.Fragment>
      )}
    </StyledButton>
  )
};