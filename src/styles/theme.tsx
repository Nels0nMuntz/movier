import React, { ForwardRefRenderFunction } from "react";
import { PaletteColor, Theme, createTheme } from "@mui/material/styles";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

declare module "@mui/material/styles" {

  interface Palette {
    custom: {
      bg: {
        tooltip?: Partial<PaletteColor>
      }
    }
  }
  interface PaletteOptions {
    custom: {
      bg: {
        tooltip: Partial<PaletteColor>
      }
    }
  }
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

// declare module "@mui/material/styles" {
// 	interface Palette {
// 		navbarBg: Palette["primary"];
// 		danger: Palette["primary"];
// 	}
// 	interface PaletteOptions {
// 		light?: PaletteOptions["primary"];
// 		dark?: PaletteOptions["primary"];
// 		danger?: PaletteOptions["primary"];
// 		medium?: PaletteOptions["primary"];
// 		navbarBg?: PaletteOptions["primary"];
// 	}
// }


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
      default: "#202020",
    },
    custom: {
      bg: {
        tooltip: {
          main: "#0d0c0c",
        },
      },
    },
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