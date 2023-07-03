import { observer } from "mobx-react-lite";

import { MainSlider, ScrollableCollection, SwitchableCollection } from "components";
import { rootStore } from "store";
import { MainLayout } from "layouts";


export const Browse = observer(() => {

  const {moviesStore, browseStore} = rootStore;

  const isInitialized = browseStore.isInitialized;
  const popularMovies = moviesStore.lists.popular.data;
  const trendingDailyMovies = moviesStore.lists.trendingDaily.data;
  const trendingWeeklyMovies = moviesStore.lists.trendingWeekly.data;
  // const topRatedMovies = moviesStore.lists.topRated.data;
  // const upcomingMovies = moviesStore.lists.upcoming.data;
  // const loadPopularMovies = moviesStore.getPopular;
  const loadTrendingDaly = moviesStore.getTrendingDaly;
  const loadTrendingWeekly = moviesStore.getTrendingWeekly;
  // const loadTopRated = moviesStore.getTopRated;
  // const loadUpcoming = moviesStore.getUpcoming;

  return (
    <MainLayout isLoading={!isInitialized}>
      <MainSlider items={popularMovies} />
      <SwitchableCollection
        title="trending movies"
        collections={[
          { items: trendingDailyMovies, title: "Daily", loadItems: loadTrendingDaly },
          { items: trendingWeeklyMovies, title: "Weekly", loadItems: loadTrendingWeekly },
        ]}
      />
      {/* <ScrollableCollection
        title="Popular Movies"
        items={popularMovies}
        loadItems={loadPopularMovies}
      />
      <ScrollableCollection
        title="Top Rated"
        items={topRatedMovies}
        loadItems={loadTopRated}
      />
      <ScrollableCollection
        title="Upcoming"
        items={upcomingMovies}
        loadItems={loadUpcoming}
      /> */}
    </MainLayout>
  )
});
