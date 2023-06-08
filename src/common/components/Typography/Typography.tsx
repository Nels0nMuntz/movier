import React, { PropsWithChildren } from "react";


export const TYPOGRAPHY_TYPES = {
  h1: "h1",
  h2: "h2",
}

interface Props {
  type: keyof typeof TYPOGRAPHY_TYPES,
  element: keyof JSX.IntrinsicElements;
  color?: string;
}

export const Typography: React.FC<Props & PropsWithChildren & React.HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  const {
    type,
    element, 
    children, 
    color,
    ...attributes
  } = props;
  const Component = element || "div";
  return (
    <Component 
      className={`typography_${type}`}
      style={{
        color: color || "initial",
      }}
      {...attributes}
    >
      {children}
    </Component>
  )
};