import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";

import { CoverflowSlider, ScrollableCollection } from "components";
import { rootStore } from "store";
import { MainLayout } from "layouts";
import { CoverflowSliderItem } from "components/common/Slider/CoverflowSlider/CoverflowSlider";


export const Shows = observer(() => {

  const { tvShowsPageStore, tvShowsCollectionStore } = rootStore;

  const isInitialized = tvShowsPageStore.isInitialized;
  const { airingToday, onTheAir, popular, topRated } = tvShowsCollectionStore.lists
  const { loadAiringToday, loadOnTheAir, loadPopular } = tvShowsCollectionStore;

  const topRatedItems = topRated.data.map<CoverflowSliderItem>(({ id, overview, name, backdrop_path }) => ({
    id,
    title: name,
    overview,
    imagePath: backdrop_path,
    kind: "series",
  }))

  return (
    <MainLayout isLoading={!isInitialized}>
      <Box sx={{ mb: 6 }}>
        <CoverflowSlider
          items={topRatedItems}
        />
      </Box>
      <ScrollableCollection
        title="Popular"
        items={popular.data}
        loadItems={loadPopular}
      />
      <ScrollableCollection
        title="Airing Today"
        items={airingToday.data}
        loadItems={loadAiringToday}
      />
      <ScrollableCollection
        title="On The Air"
        items={onTheAir.data}
        loadItems={loadOnTheAir}
      />
    </MainLayout>
  )
});
