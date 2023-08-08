import React, { PropsWithChildren } from "react";
import { styled, Theme } from "@mui/material/styles";
import { theme } from "styles/theme";


export const TYPOGRAPHY_TYPES = {
  heading_1: "heading_1",
  heading_2: "heading_2",
  heading_3: "heading_3",
  heading_4: "heading_4",
  heading_5: "heading_5",
  heading_6: "heading_6",
  body_1: "body_1",
  body_2: "body_2",
}

export interface Props extends PropsWithChildren, React.HTMLAttributes<HTMLOrSVGElement> {
  type: keyof typeof TYPOGRAPHY_TYPES,
  element: keyof JSX.IntrinsicElements;
  color?: "primary" | "secondary";
  textAlign?: "left" | "right" | "center";
  styles?: React.CSSProperties | ((theme: Theme) => React.CSSProperties)
}

const TypographyComponent: React.FC<Props> = (props) => {
  const {
    type,
    element, 
    children, 
    textAlign,
    styles,
    ...attributes
  } = props;
  const Component = element || "div";
  const style = !styles ? {} : typeof styles === "function" ? styles(theme) : styles;
  return (
    <Component 
      data-typography-type={type}    
      {...attributes}
      style={style}
    >
      {children}
    </Component>
  )
};

export const Typography = styled(TypographyComponent)(({ theme, color, textAlign }) => ({
  color: color ? theme.palette.text[color] : theme.palette.text.primary,
  textAlign: textAlign || "left",
  "&[data-typography-type='heading_1']": {
    fontSize: "70px",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  "&[data-typography-type='heading_2']": {
    fontSize: "46px",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  "&[data-typography-type='heading_3']": {
    fontSize: "42px",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  "&[data-typography-type='heading_4']": {
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.64px",
  },
  "&[data-typography-type='heading_5']": {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: 1.5,
  },
  "&[data-typography-type='heading_6']": {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "24px",
  },
  "&[data-typography-type='body_1']": {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
  },
  "&[data-typography-type='body_2']": {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
  },
}))