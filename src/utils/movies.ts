import { MovieResponse } from "api";
import { GenresCollection, Movie, MovieBase, PaginatableCollection } from "types";


const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const normalizeMovie = (movie: MovieResponse, geners: GenresCollection): Movie => {
  return {
    ...movie,
    kind: "movie",
    release_date: movie.release_date.slice(0,4),
    genres: movie.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeMoviesResponse = (movies: MovieResponse[], geners: GenresCollection): Movie[] => {
  return movies.map(movie => normalizeMovie(movie, geners));
};

export const isLastMoviePage = (moviesResponse: PaginatableCollection<MovieBase>) => {
  return moviesResponse.page === moviesResponse.total_pages
};

export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - (hours * 60);
  return `${hours}h ${minutes}min`;
};

export const formatMoney = (money: number) => {
  return usdFormatter.format(money);
}