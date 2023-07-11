import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";

import { MainLayout } from "layouts";
import { rootStore } from "store";
import { CoverflowSlider, ScrollableCollection } from "components";
import { CoverflowSliderItem } from "components/common/Slider/CoverflowSlider/CoverflowSlider";


export const Movies = observer(() => {
  const { moviesPageStore, moviesCollectionStore } = rootStore;
  const isLoading = !moviesPageStore.isInitialized;
  const topRatedMovies = moviesCollectionStore.lists.topRated.data;
  const popularMovies = moviesCollectionStore.lists.popular.data;
  const loadPopularMovies = moviesCollectionStore.loadPopular;
  const upcomingMovies = moviesCollectionStore.lists.upcoming.data;
  const loadUpcomingMovies = moviesCollectionStore.loadUpcoming;

  const topRatedItems = topRatedMovies.map<CoverflowSliderItem>(({ id, title, overview, backdrop_path }) => ({
    id,
    title,
    overview,
    imagePath: backdrop_path,
    kind: "movie",
  }))

  return (
    <MainLayout isLoading={isLoading} isFaild>
      <Box sx={{ mb: 6 }}>
        <CoverflowSlider
          items={topRatedItems}
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
