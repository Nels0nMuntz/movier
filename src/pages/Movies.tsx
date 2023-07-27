import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";

import { MainLayout } from "layouts";
import { useStore } from "store";
import { CoverflowSlider, ScrollableCollection } from "components";


export const Movies = observer(() => {
  const { moviesPageStore, moviesCollectionStore } = useStore();
  const isLoading = !moviesPageStore.isInitialized;
  const topRatedMovies = moviesCollectionStore.lists.topRated.data;
  const popularMovies = moviesCollectionStore.lists.popular.data;
  const loadPopularMovies = moviesCollectionStore.loadPopular;
  const upcomingMovies = moviesCollectionStore.lists.upcoming.data;
  const loadUpcomingMovies = moviesCollectionStore.loadUpcoming;

  return (
    <MainLayout isLoading={isLoading}>
      <Box sx={{ mb: 6 }}>
        <CoverflowSlider
          items={topRatedMovies}
        />
      </Box>
      <ScrollableCollection
        title="Popular movies"
        items={popularMovies}
        loadItems={loadPopularMovies}
      />
      <ScrollableCollection
        title="Popular movies"
        items={upcomingMovies}
        loadItems={loadUpcomingMovies}
      />
    </MainLayout>
  )
});
