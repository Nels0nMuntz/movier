import React from "react"
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";

import { APP_URLS } from "routes";
import { TextButton, Typography } from "components";
import { useStore } from "store";
import { getW45ImageUrl } from "api";
import { HoverMenu } from "./components/HoverMenu/HoverMenu";
import {
  LogoImg,
  Nav,
  AppHeader,
  StyledAvatar,
  ListItem,
  StyledMenu,
} from "./styled";

import logo from "../../../assets/img/logo.svg";
import { HideOnScroll } from "./components/HideOnScroll/HideOnScroll";
import { Search } from "./components/Search/Search";
import { localStorageHelper } from "utils";


export type HeaderMode = "normal" | "transparent"

interface Props {
  mode?: HeaderMode;
}

export const Header: React.FC<Props> = observer(({ mode }) => {
  const navigate = useNavigate()
  const { accountStore } = useStore();
  const { username, avatar } = accountStore.account.data;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorageHelper.clear();
    handleCloseUserMenu();
    navigate(APP_URLS.authWelcome.path);
  }
  const isModeTransparent = mode === "transparent";
  const avatarPath = avatar ? getW45ImageUrl(avatar) : "";

  const watchlistMenu = React.useMemo(() => (
    <Stack direction="column" component="ul">
      <ListItem>
        <Link to={APP_URLS.watchlist.path.movies} key="Movies">
          <Typography element="span" type="heading_6">Movies</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link to={APP_URLS.watchlist.path.tv} key="TV">
          <Typography element="span" type="heading_6">TV</Typography>
        </Link>
      </ListItem>
    </Stack>
  ), []);
  const favoriteMenu = React.useMemo(() => (
    <Stack direction="column" component="ul">
      <ListItem>
        <Link to={APP_URLS.favorite.path.movies} key="Movies">
          <Typography element="span" type="heading_6">Movies</Typography>
        </Link>
      </ListItem>
      <ListItem>
        <Link to={APP_URLS.favorite.path.tv} key="TV">
          <Typography element="span" type="heading_6">TV</Typography>
        </Link>
      </ListItem>
    </Stack>
  ), []);

  return (
    <HideOnScroll>
      <AppHeader
        className={[
          isModeTransparent ? "transparent" : "",
        ].join(" ")}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="toolbar">
            <IconButton className="logo" aria-label="Go to home page" size="medium">
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
                  <HoverMenu
                    title="Watchlist"
                    items={watchlistMenu}
                  />
                </li>
                <li>
                  <HoverMenu
                    title="Favorite"
                    items={favoriteMenu}
                  />
                </li>
              </ul>
            </Nav>
            <Box className="search-box">
              <Search />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu}>
                  <StyledAvatar alt={username} src={avatarPath}>
                    <PersonIcon fontSize="medium" />
                  </StyledAvatar>
                </IconButton>
              </Tooltip>
              <StyledMenu
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
                className=""
              >
                <MenuItem key={1} disableRipple className="disabled">
                  <Stack direction="row" gap={3} px={2.5} py={1} alignItems="center">
                    <StyledAvatar alt={username} src={avatarPath}>
                      <PersonIcon fontSize="medium" />
                    </StyledAvatar>
                    <Typography element="span" type="body_1">{username}</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem disableRipple className="mobile-only">
                  <Link to={APP_URLS.browse.path}>
                    <Typography element="span" type="body_1">Home</Typography>
                  </Link>
                </MenuItem>
                <MenuItem disableRipple className="mobile-only">
                  <Link to={APP_URLS.movies.path}>
                    <Typography element="span" type="body_1">Movies</Typography>
                  </Link>
                </MenuItem>
                <MenuItem disableRipple className="mobile-only">
                  <Link to={APP_URLS.tvShows.path}>
                    <Typography element="span" type="body_1">Shows</Typography>
                  </Link>
                </MenuItem>
                <MenuItem disableRipple className="mobile-only menu-item-tooltip">
                  <HoverMenu
                    items={watchlistMenu}
                    placement="left-start"
                  >
                    <TextButton className="menu-button">
                      <Typography element="span" type="body_1">Watchlist</Typography>
                    </TextButton>
                  </HoverMenu>
                </MenuItem>
                <MenuItem disableRipple className="mobile-only menu-item-tooltip">
                  <HoverMenu
                    items={favoriteMenu}
                    placement="left-start"
                  >
                    <TextButton className="menu-button">
                      <Typography element="span" type="body_1">Favorite</Typography>
                    </TextButton>
                  </HoverMenu>
                </MenuItem>
                <MenuItem key={2} onClick={handleLogout} disableRipple>
                  <Typography element="span" type="body_1" textAlign="center">Sign out</Typography>
                </MenuItem>
              </StyledMenu>
            </Box>
          </Toolbar>
        </Container>
      </AppHeader>
    </HideOnScroll>
  )
});
