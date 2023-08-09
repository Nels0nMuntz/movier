import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
  const authenticateExternally = authStore.createExternallyAuthenticatedSession;
  const createAuthenticatedWithCredentialsSession = authStore.createAuthenticatedWithCredentialsSession;

  const authenticateExternallyHandler = () => {
    authenticateExternally({
      onSuccess: navigateToBrowsePage, 
    });   
  }

  const authenticateWithCredentials = (values: LoginData) => {
    createAuthenticatedWithCredentialsSession({
      username: values.username,
      password: values.password,
      onSuccess: navigateToBrowsePage, 
    });
  }

  return (
    <AuthLayout>
      <Stack 
        direction="column" 
        gap={3} 
        width="100%"
        maxWidth="335px"
        flexGrow={1}
        justifyContent="center"
        mx="auto"
      >
        <Button
          variant="outlined"
          endIcon={<TmdbImg src={tmdb} alt="tmdb" />}
          onClick={authenticateExternallyHandler}
        >
          Continue with
        </Button>
        <Devider>or</Devider>
        <LoginForm  onSubmit={authenticateWithCredentials}/>
      </Stack>
    </AuthLayout>
  )
});
