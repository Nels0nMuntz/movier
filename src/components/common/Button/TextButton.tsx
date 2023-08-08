import React from "react";
import { styled } from "@mui/material/styles";
import Button, {  } from "@mui/material/Button";


const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: "unset",
  "&:hover": {
    backgroundColor: "transparent",
  }
}));

interface Props extends React.PropsWithChildren {
  size?: "small" | "medium" | "large",
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export const TextButton: React.FC<Props> = ({ size, children, className, onClick }) => {
  return (
    <StyledButton
      variant="text"
      size={size}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
