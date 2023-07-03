import { GetMoviesResponse, MovieResponse } from "api";
import { Genres, Movie } from "types";

const normalizeMovie = (movie: MovieResponse, geners: Genres): Movie => {
  return {
    ...movie,
    release_date: movie.release_date.slice(0,4),
    genres: movie.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeMoviesResponse = (movies: MovieResponse[], geners: Genres): Movie[] => {
  return movies.map(movie => normalizeMovie(movie, geners));
};

export const isLastMoviePage = (moviesResponse: GetMoviesResponse) => {
  return moviesResponse.page === moviesResponse.total_pages
}