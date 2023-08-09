import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";

import { LoginData } from "types";
import { TextButton } from "components";
import { Form, Input } from "./styled";
import { PasswordInput } from "./components/PasswordInput/PasswordInput";


interface Props {
  onSubmit: (values: LoginData) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <Stack
        width="100%"
        direction="column"
        gap={4}
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field, fieldState }) => (
            <Input
              id="username"
              label="Username"
              variant="outlined"
              helperText={fieldState.error?.message}
              error={fieldState.invalid}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true, message: "Field is required"
            },
            minLength: {
              value: 6,
              message: "Password is too short"
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              field={field}
              fieldState={fieldState}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth>Log In</Button>
        <TextButton size="small">Forgot password ?</TextButton>
      </Stack>
    </Form>
  )
};
