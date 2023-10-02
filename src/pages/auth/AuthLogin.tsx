import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "layouts";
import { LoginForm } from "components";
import { LoginData } from "types";
import { useStore } from "store";
import { APP_URLS } from "routes";

import tmdb from "../../assets/img/tmdb.svg";


const Devider = styled("span")(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.common.white
}));

const TmdbImg = styled("img")({
  position: "relative",
  top: "-1px",
  width: "76px",
});


export const AuthLogin = observer(() => {

  const navigate = useNavigate();
  const navigateToBrowsePage = () => navigate(APP_URLS.browse.path);

  const { authStore } = useStore()
  const { requestToken } = authStore;
  const isLoginPageVisible = !!requestToken;
  const isExternalAuthAllowed = !!requestToken;
  
  const createAuthenticatedWithCredentialsSession = authStore.createAuthenticatedWithCredentialsSession;

  const authenticateWithCredentials = (values: LoginData) => {
    createAuthenticatedWithCredentialsSession({
      username: values.username,
      password: values.password,
      onSuccess: navigateToBrowsePage,
    });
  };

  return (
    <AuthLayout>
      {isLoginPageVisible ? (
        <Stack
          direction="column"
          gap={3}
          width="100%"
          maxWidth="335px"
          flexGrow={1}
          justifyContent="center"
          mx="auto"
        >
          {isExternalAuthAllowed && (
            <>
              <Button
                variant="outlined"
                endIcon={<TmdbImg src={tmdb} alt="tmdb" />}
                href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${location.href}`}
              >
                Continue with
              </Button>
              <Devider>or</Devider>
            </>
          )}
          <LoginForm onSubmit={authenticateWithCredentials} />
        </Stack>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: theme => theme.palette.success.main }} size={64} />
        </Box>
      )}
    </AuthLayout>
  )
});
