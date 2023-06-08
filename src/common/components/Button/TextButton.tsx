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
}

export const TextButton: React.FC<Props> = ({ size, children }) => {
  return (
    <StyledButton
      variant="text"
      size={size}
    >
      {children}
    </StyledButton>
  )
}
