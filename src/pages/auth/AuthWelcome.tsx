import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { TextButton, Typography } from "components"
import { APP_URLS } from "routes/urls";
import { AuthLayout } from "layouts";
import logo from "../../assets/img/logo.svg";
import { useStore } from "store";


const PrimaryButton = styled(Button)({
  width: "100%",
  maxWidth: "335px"
});

const LogoImg = styled("img")({
  width: "128px",
})

export const AuthWelcome = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();
  const navigateToBrowsePage = () => navigate(APP_URLS.browse.path);
  const handleClickGeust = () => authStore.createGuestSession({
    onSuccess: navigateToBrowsePage, 
  });
  return (
    <AuthLayout>
      <Stack
        direction="column"
        alignItems="center"
        flexGrow={1}
        color={(theme) => theme.palette.common.white}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          gap={2}
        >
          <Link to="/">
            <LogoImg src={logo} width="128" alt="logo" />
          </Link>
          <Typography type="heading_3" element="h1">Welcome to Movier</Typography>
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
            onClick={handleClickGeust}
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
