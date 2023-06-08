import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { TextButton, Typography } from "common/components"
import { APP_URLS } from "urls";
import { AuthLayout } from "layouts";
import logo from "../../assets/img/logo.svg";


const PrimaryButton = styled(Button)({
  width: "100%",
  maxWidth: "335px"
});

export const AuthWelcome = () => {
  return (
    <AuthLayout>
      <Stack
        height="100%"
        direction="column"
        alignItems="center"
        color={(theme) => theme.palette.common.white}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Link to="/">
            <img src={logo} width="128" alt="logo" />
          </Link>
          <Typography type="h1" element="h1" color="inherit">Welcome to Movier</Typography>
        </Stack>
        <Stack
          width="100%"
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <TextButton
            size="small"
          >
            Continue as a guest
          </TextButton>
          <PrimaryButton variant="contained" fullWidth href={APP_URLS.authLogin}>
            Log In
          </PrimaryButton>
          <PrimaryButton variant="outlined" fullWidth>
            Sign Up
          </PrimaryButton>
        </Stack>
      </Stack>
    </AuthLayout>
  )
};
