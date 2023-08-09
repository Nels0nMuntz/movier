import React from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { LoginData } from "types";
import { Input } from "../../styled"


interface Props {
  field: ControllerRenderProps<LoginData, "password">;
  fieldState: ControllerFieldState;
}

export const PasswordInput: React.FC<Props> = ({ field, fieldState }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Input
      id="password"
      label="Password"
      variant="outlined"
      type={showPassword ? "text" : "password"}
      helperText={fieldState.error?.message}
      error={fieldState.invalid}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff/> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...field}
    />
  )
}