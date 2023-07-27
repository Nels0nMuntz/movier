import { observer } from "mobx-react-lite";

import { MainLayout } from "layouts";
import { MovieDetails as MovieDetailsComponent } from "components"
import { useStore } from "store";
import { Movie, MovieDetails as MovieDetailsType } from "types";


export const MovieDetails: React.FC = observer(() => {
  const { moviesPageStore } = useStore();
  const movie = moviesPageStore.movie.data;
  const isLoading = moviesPageStore.isMovieDetailsLoading;
  const loadSimilarMovies = moviesPageStore.getSimilarMovies;
  return (
    <MainLayout isLoading={isLoading} headerMode="transparent">
      <MovieDetailsComponent movie={movie as MovieDetailsType<Movie>} loadSimilarMovies={loadSimilarMovies}/>
    </MainLayout>
  )
});
