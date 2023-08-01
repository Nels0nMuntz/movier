import { styled } from "@mui/material/styles";
import React, { FC, PropsWithChildren } from "react";
import { Typography } from "../../Typography/Typography";
import { Link } from "react-router-dom";


export interface Props extends PropsWithChildren {
  href: string;
  icon?: React.ReactNode;
  children?: string;
}

const StyledLink = styled(Link)(({ theme }) => ({
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

export const PrimaryLink: FC<Props> = ({ href, icon, children }) => {
  return (
    <StyledLink to={href}>
      {icon}
      {children && (
        <Typography element="span" type="body_1" data-testid="primary-link-children">
          {children}
        </Typography>
      )}
    </StyledLink>
  )
};