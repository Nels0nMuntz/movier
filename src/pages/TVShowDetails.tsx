import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { TVShowDetails as TVShowDetailsComponent } from "components";
import { useStore } from "store";


export const TVShowDetails: React.FC = observer(function TVShowDetails() {
  const { tvShowsPageStore } = useStore();
  const isLoading = tvShowsPageStore.isTVShowDetailsLoading;
  return (
    <MainLayout isLoading={isLoading} headerMode="transparent">
      <TVShowDetailsComponent />
    </MainLayout>
  )
});
