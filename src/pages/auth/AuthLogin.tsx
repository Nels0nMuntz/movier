import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite" 

import { AuthLayout } from "layouts";
import { LoginForm } from "components";
import { LoginData } from "models";

import tmdb from "../../assets/img/tmdb.svg";
import { rootStore } from "store";


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

  const authenticateExternally = rootStore.authStore.createExternallyAuthenticatedSession;
  const createAuthenticatedWithCredentialsSession = rootStore.authStore.createAuthenticatedWithCredentialsSession;

  const authenticateExternallyHandler = async () => {
    const response = await authenticateExternally();
    console.log({response});    
  }

  const authenticateWithCredentials = async (values: LoginData) => {
    const response = await createAuthenticatedWithCredentialsSession({
      username: values.username,
      password: values.password,
    });
    console.log({response}); 
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
