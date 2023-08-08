import { MovieResponse } from "api/movies/types";
import { TVShowResponse } from "api/tvShows/types";
import { MediaType, PaginatableCollection } from "types";

export interface SearchRequest {
  query: string;
  includeAdult: boolean;
  language: string;
  page: number;
}

interface MovieSearchResponse extends MovieResponse {
  media_type: MediaType;
}

interface TVShowSearchResponse extends TVShowResponse {
  media_type: MediaType;
}

export type MultiSearchResponse = PaginatableCollection<MovieSearchResponse & TVShowSearchResponse>;

export type MoviesSearchResponse = PaginatableCollection<MovieResponse>;

export type TVShowsSearchResponse = PaginatableCollection<TVShowResponse>;