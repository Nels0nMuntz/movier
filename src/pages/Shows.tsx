import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";

import { CoverflowSlider, ScrollableCollection } from "components";
import { useStore } from "store";
import { MainLayout } from "layouts";


export const Shows = observer(() => {

  const { tvShowsPageStore, tvShowsCollectionStore } = useStore();

  const isInitialized = tvShowsPageStore.isInitialized;
  const { airingToday, onTheAir, popular, topRated } = tvShowsCollectionStore.lists
  const { loadAiringToday, loadOnTheAir, loadPopular } = tvShowsCollectionStore;

  return (
    <MainLayout isLoading={!isInitialized}>
      <Box sx={{ mb: 6 }}>
        <CoverflowSlider
          items={topRated.data}
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
