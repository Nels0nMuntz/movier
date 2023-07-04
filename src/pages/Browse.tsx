import { observer } from "mobx-react-lite";

import { MainSlider, SwitchableCollection } from "components";
import { rootStore } from "store";
import { MainLayout } from "layouts";


export const Browse = observer(() => {

  const { moviesStore, tvShowsStore, browseStore } = rootStore;

  const isInitialized = browseStore.isInitialized;
  const popularMovies = moviesStore.lists.popular.data;
  const trendingDailyMovies = moviesStore.lists.trendingDaily.data;
  const trendingWeeklyMovies = moviesStore.lists.trendingWeekly.data;
  const loadTrendingDailyMovies = moviesStore.getTrendingDaily;
  const loadTrendingWeeklyMovies = moviesStore.getTrendingWeekly;
  const trendingDailyShows = tvShowsStore.lists.trendingDaily.data;
  const trendingWeeklyShows = tvShowsStore.lists.trendingWeekly.data;
  const loadTrendingDailyTvShows = tvShowsStore.getTrendingDaily;
  const loadTrendingWeeklyTvShows = tvShowsStore.getTrendingWeekly;

  return (
    <MainLayout isLoading={!isInitialized}>
      <MainSlider items={popularMovies} />
      <SwitchableCollection
        title="trending movies"
        collections={[
          { items: trendingDailyMovies, title: "Daily", loadItems: loadTrendingDailyMovies },
          { items: trendingWeeklyMovies, title: "Weekly", loadItems: loadTrendingWeeklyMovies },
        ]}
      />
      <SwitchableCollection
        title="trending tv shows"
        collections={[
          { items: trendingDailyShows, title: "Daily", loadItems: loadTrendingDailyTvShows },
          { items: trendingWeeklyShows, title: "Weekly", loadItems: loadTrendingWeeklyTvShows },
        ]}
      />
    </MainLayout>
  )
});
