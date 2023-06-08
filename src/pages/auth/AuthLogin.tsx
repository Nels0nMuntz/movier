import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthLayout } from "layouts";
import { TextButton } from "common/components";


interface LoginData {
  username: string;
  password: string;
}

const Input = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiFormLabel-root": {
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main
  },
  "& .MuiInputBase-root": {
    color: theme.palette.common.white,

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.dark
    }
  }
}));

const Form = styled("form")({
  height: "100%",
});

export const AuthLogin = () => {
  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginData) => {
    console.log({ values });
  }
  return (
    <AuthLayout>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Stack
          width="100%"
          maxWidth="335px"
          height="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
          mx="auto"
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
              <Input 
                id="password" 
                label="Password" 
                variant="outlined" 
                helperText={fieldState.error?.message}
                error={fieldState.invalid}
                {...field} 
              />
            )}
          />
          <Button type="submit" variant="contained" fullWidth>Log In</Button>
          <TextButton size="small">Forgot password ?</TextButton>
        </Stack>
      </Form>
    </AuthLayout>
  )
};
