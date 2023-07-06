import React from "react"
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

import { APP_URLS } from "routes";
import { Typography } from "components";
import {
  LogoImg,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  Nav,
} from "./styled"

import logo from "../../../assets/img/logo.svg";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton aria-label="Go to home page" size="medium">
            <LogoImg src={logo} alt="logo" />
          </IconButton>
          <Nav>
            <ul>
              <li>
                <Link to={APP_URLS.browse.path}>
                  <Typography element="span" type="heading_6">Home</Typography>
                </Link>
              </li>
              <li>
                <Link to={APP_URLS.movies.path}>
                  <Typography element="span" type="heading_6">Movies</Typography>
                </Link>
              </li>
              <li>
                <Link to={APP_URLS.tvShows.path}>
                  <Typography element="span" type="heading_6">Shows</Typography>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Typography element="span" type="heading_6">People</Typography>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Typography element="span" type="heading_6">Geners</Typography>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <Typography element="span" type="heading_6">Favourite</Typography>
                </Link>
              </li>
            </ul>
          </Nav>
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Box
                  sx={({ palette }) => ({
                    width: "36px",
                    height: "36px",
                    background: palette.secondary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    color: palette.common.white
                  })}
                >
                  <PersonIcon />
                </Box>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography element="span" type="body_1" textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};
