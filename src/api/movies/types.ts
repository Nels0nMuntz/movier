import { UniqueId } from "types";

export interface MovieApiResponse {
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

export interface GetPopularMovieListResponse {
  page: number;
  results: MovieApiResponse[];
  total_pages: number;
  total_results: number;
}