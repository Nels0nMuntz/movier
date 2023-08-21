import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { useStore } from "store";
import { MediaType } from "types";
import { SimpleCollection, TextButton } from "components";
import { MainLayout } from "layouts";


export const Watchlist = observer(function Watchlist() {
  const { type } = useParams<{ type: MediaType }>();
  const { moviesPageStore, tvShowsPageStore } = useStore();
  const {
    isWatchlistLoading: isWatchlistMoviesLoading,
    watchlist: watchlistMovies,
  } = moviesPageStore;
  const {
    isWatchlistLoading: isWatchlistTVShowsLoading,
    watchlist: watchlistTVShows,
  } = tvShowsPageStore;

  const isLoading = type === "movie" ? isWatchlistMoviesLoading : isWatchlistTVShowsLoading;
  const items = type === "movie" ? watchlistMovies.data.data : watchlistTVShows.data.data;  

  return (
    <MainLayout isLoading={isLoading}>
      <Container maxWidth="xl">
        <SimpleCollection items={items} />
        <Stack direction="column" justifyContent="center">
        </Stack>
      </Container>
    </MainLayout>
  )
});
