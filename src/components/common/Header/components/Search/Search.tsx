import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";

import { Search as Wrapper, SearchIconWrapper, StyledInputBase, StyledTooltip, SearchList, SearchFooter, SearchHeading, SearchLink } from "./styled";
import { Skeleton, SkeletonProvider, Typography } from "components";
import { useDebounce } from "hooks";
import { useStore } from "store";
import SearchItem from "./components/SearchItem";
import { Item } from "./components/styled";
import { APP_URLS } from "routes";


const isEmptyString = (str: string) => {
  return Boolean(!str.toString().replace(/\s/g, "").length)
}


export const Search = observer(function Search() {
  const { searchStore } = useStore();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { isMultiSearchRunning, isMultiSearchSuccess } = searchStore;
  const { data } = searchStore.multiSearchResult;
  const resultHasMovies = Boolean(data.movies.length);
  const resultHasTVShows = Boolean(data.tvShows.length);
  const resultEmpty = !resultHasMovies && !resultHasTVShows;


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeQuery = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value)
  }, []);
  const makeRequest = (value: string) => {
    if (isEmptyString(value)) return;
    handleOpen();
    searchStore.multiSearch(value);
  };
  const handleSearch = useDebounce(makeRequest, 600);
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!isEmptyString(e.target.value)) {
      handleOpen();
    }
  };

  const tooltipContent = (
    <React.Fragment>
      {isMultiSearchRunning && (
        <SkeletonProvider visible={true}>
          <SearchList>
            <Skeleton variant="text">
              <Typography element="h3" type="body_2">Movies</Typography>
            </Skeleton>
            <Item>
              <div className="grid">
                <Skeleton variant="rectangular" width={92} height={60} style={{ flexShrink: 0 }} />
                <div className="content">
                  <Skeleton variant="text">
                    <Typography element="span" type="body_1" className="title">Title</Typography>
                  </Skeleton>
                  <Skeleton variant="text">
                    <Typography element="span" type="body_1" className="title">Genre / Genre</Typography>
                  </Skeleton>
                </div>
              </div>
            </Item>
          </SearchList>
        </SkeletonProvider>
      )}
      {isMultiSearchSuccess && (
        <React.Fragment>
          {resultEmpty && (
            <Box display="flex" justifyContent="center">
              <Typography element="span" type="heading_6">No Results Found</Typography>
            </Box>
          )}
          {resultHasMovies && (
            <React.Fragment>
              <SearchHeading element="h3" type="body_2">Movies</SearchHeading>
              <SearchList>
                {data.movies.slice(0, 3).map(({ id, genres, title, poster_path }) => (
                  <SearchItem
                    key={id}
                    id={id}
                    title={title}
                    genres={genres}
                    mediaType="movie"
                    posterPath={poster_path}
                  />
                ))}
              </SearchList>
            </React.Fragment>
          )}
          {resultHasTVShows && (
            <React.Fragment>
              <SearchHeading element="h3" type="body_2">TV</SearchHeading>
              <SearchList>
                {data.tvShows.slice(0, 3).map(({ id, genres, name, poster_path }) => (
                  <SearchItem
                    key={id}
                    id={id}
                    title={name}
                    genres={genres}
                    mediaType="tv"
                    posterPath={poster_path}
                  />
                ))}
              </SearchList>
            </React.Fragment>
          )}
          {!resultEmpty && (
            <SearchFooter>
              <SearchLink to={APP_URLS.searchResult.path}>
                <Typography element="span" type="body_1">See All</Typography>
              </SearchLink>
            </SearchFooter>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )

  return (
    <Wrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <ClickAwayListener onClickAway={handleClose}>
        <div>
          <StyledTooltip
            open={open}
            onClose={handleClose}
            title={tooltipContent}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            PopperProps={{
              disablePortal: true,
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={handleChangeQuery}
              onFocus={handleFocus}
            />
          </StyledTooltip>
        </div>
      </ClickAwayListener>
    </Wrapper>
  )
})