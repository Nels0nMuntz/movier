import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { useStore } from "store";
import { PrimaryButton, SimpleCollection, Typography } from "components";


export const SearchResult = observer(() => {
  const { searchStore } = useStore();
  const { searchMovies, searchTvShows, isMoviesSearchLoading, isTvShowsSearchLoading } = searchStore;
  const { data: movies, isLastPage: isLastMoviespage } = searchStore.moviesSearchResult;
  const { data: tvShows, isLastPage: isLastTvShowspage } = searchStore.tvShowsSearchResult;
  const resultHasMovies = Boolean(movies.length);
  const resultHasTVShows = Boolean(tvShows.length);
  const emptyResult = !resultHasMovies && !resultHasTVShows;

  const loadMoreMovies = () => searchMovies();
  const loadMoreTvShows = () => searchTvShows();

  return (
    <React.Fragment>
      {emptyResult && (
        <Box py={2}>
          <Typography element="h3" type="heading_5">No Results Found</Typography>
        </Box>
      )}
      {resultHasMovies && (
        <Box mb={6}>
          <Typography element="h2" type="heading_3">Movies</Typography>
          <SimpleCollection items={movies} />
          {!isLastMoviespage && (
            <Stack direction="row" justifyContent="center">
              <PrimaryButton
                alignCenter
                isLoading={isMoviesSearchLoading}
                onClick={loadMoreMovies}
              >
                Show More
              </PrimaryButton>
            </Stack>
          )}
        </Box>
      )}
      {resultHasTVShows && (
        <Stack mb={6}>
          <Typography element="h2" type="heading_3">TV</Typography>
          <SimpleCollection items={tvShows} />
          {!isLastTvShowspage && (
            <Stack direction="row" justifyContent="center">
              <PrimaryButton
                alignCenter
                isLoading={isTvShowsSearchLoading}
                onClick={loadMoreTvShows}
              >
                Show More
              </PrimaryButton>
            </Stack>
          )}
        </Stack>
      )}
    </React.Fragment>
  )
})