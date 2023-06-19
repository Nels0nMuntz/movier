import React, { PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";


export const TYPOGRAPHY_TYPES = {
  heading_1: "heading_1",
  heading_2: "heading_2",
  heading_3: "heading_3",
  heading_4: "heading_4",
  heading_5: "heading_5",
  heading_6: "heading_6",
  body_1: "body_1",
}

interface Props {
  type: keyof typeof TYPOGRAPHY_TYPES,
  element: keyof JSX.IntrinsicElements;
  color?: string;
  textAlign?: "left" | "right" | "center",
}

const TypographyComponent: React.FC<Props & PropsWithChildren & React.HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  const {
    type,
    element, 
    children, 
    textAlign,
    ...attributes
  } = props;
  const Component = element || "div";
  return (
    <Component 
      data-typography-type={type}      
      {...attributes}
    >
      {children}
    </Component>
  )
};

export const Typography = styled(TypographyComponent)(({ theme, color, textAlign }) => ({
  color: color || theme.palette.text.primary,
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
}))