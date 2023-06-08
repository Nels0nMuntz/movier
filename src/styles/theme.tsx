import React, { ForwardRefRenderFunction  } from "react";
import { Theme, createTheme } from "@mui/material/styles";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";


const renderFunction: ForwardRefRenderFunction<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }> = (props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
};
const LinkBehavior = React.forwardRef(renderFunction);

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#00d474",
      dark: "#00af60",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
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
  },
})