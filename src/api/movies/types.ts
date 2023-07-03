import { UniqueId } from "types";

export interface MovieResponse {
  id: UniqueId;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: UniqueId[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface MoviesGenreResponse {
  id: number;
  name: string;
}

export interface GetMoviesResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}

export interface GetMoviesRequest {
  page: number;
}

export interface GetTrendingMoviesRequest extends GetMoviesRequest {
  timeWindow: "day" | "week";
}

export interface GetGenersMovieListResponse {
  genres: MoviesGenreResponse[];
}