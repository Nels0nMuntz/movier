import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { TVShowDetails as TVShowDetailsComponent } from "components";
import { rootStore } from "store";
import { TVShow, TVShowDetails as ITVShowDetails } from "types";


export const TVShowDetails: React.FC = observer(function TVShowDetails() {
  const { tvShowsPageStore } = rootStore;
  const isLoading = tvShowsPageStore.isTVShowDetailsLoading;
  const tvShow = tvShowsPageStore.tvShow.data;
  const loadSimilarTVShows = tvShowsPageStore.getSimilarTVShows
  return (
    <MainLayout isLoading={isLoading} headerMode="transparent">
      <TVShowDetailsComponent tvShow={tvShow as ITVShowDetails<TVShow>} loadSimilarTVShows={loadSimilarTVShows} />
    </MainLayout>
  )
});
