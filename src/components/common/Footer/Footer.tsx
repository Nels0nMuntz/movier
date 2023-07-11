import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import { LogoImg, Wrapper } from "./styled";

import logo from "../../../assets/img/logo.svg";
import { Typography } from "../Typography/Typography";


export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Container maxWidth="xl">
        <Link to="/">
          <Stack direction="row" gap={2} alignItems="center">
            <LogoImg src={logo} alt="logo"/>
            <Typography element="h3" type="heading_5">Movier</Typography>
          </Stack>
        </Link>
      </Container>
    </Wrapper>
  )
};
