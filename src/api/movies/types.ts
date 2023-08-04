import { MovieBase, MovieDetails, PaginatableCollection } from "types";

export interface MovieResponse extends MovieBase {
  genre_ids: number[];
}

export interface MoviesGenreResponse {
  id: number;
  name: string;
}

export type GetMoviesResponse = PaginatableCollection<MovieResponse>;

export interface GetMoviesRequest {
  page: number;
}

export interface GetTrendingMoviesRequest extends GetMoviesRequest {
  timeWindow: "day" | "week";
}

export interface GetGenersMovieListResponse {
  genres: MoviesGenreResponse[];
}

export interface GetMovieByIdRequest {
  id: number;
}

export type GetMovieByIdResponse = MovieDetails<MovieResponse>;

export interface GetSimilarMoviesRequest {
  movie_id: number;
  page: number;
}

export type GetSimilarMovieResponse = PaginatableCollection<MovieResponse>

export type GetMoviesPrivateListResponse = PaginatableCollection<MovieResponse>;
