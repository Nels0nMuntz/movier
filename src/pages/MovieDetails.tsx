import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { MovieDetails as MovieDetailsComponent } from "components"
import { useStore } from "store";


export const MovieDetails: React.FC = observer(() => {
  const { moviesPageStore } = useStore();
  const isLoading = moviesPageStore.isMovieDetailsLoading;
  return (
    <MainLayout isLoading={isLoading} headerMode="transparent">
      <MovieDetailsComponent />
    </MainLayout>
  )
});
