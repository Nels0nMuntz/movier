import React, { ForwardRefRenderFunction } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    ["450"]: true;
    ["768"]: true;
    ["1100"]: true;
    ["1440"]: true;
  }
}


const renderFunction: ForwardRefRenderFunction<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }> = (props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
};
const LinkBehavior = React.forwardRef(renderFunction);

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#202020",
    },
    secondary: {
      main: "#ff0000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a3a3a3",
    },
    warning: {
      main: "#ffc107",
    },
    background: {
      default: "#202020"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#ffffff",
          backgroundColor: "#00d474",
        },
        outlined: {
          color: "#00d474",
          borderColor: "#00d474"
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#272829"
        }
      }
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      "450": 450,
      "768": 768,
      "1100": 1100,
      "1440": 1440
    },
  },
})