import { PaginatableCollection, UniqueId } from "types";

export interface GetTVShowsRequest {
  page: number;
}

export interface GetTrendingTVShowsRequest extends GetTVShowsRequest {
  timeWindow: "day" | "week";
}

export interface GetOnTheAirTVShowsRequest extends GetTVShowsRequest {
  timezone?: string;
}

export interface TVShowResponse {
  id: UniqueId;
  adult: boolean;
  backdrop_path: string;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: UniqueId[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string;
}

export interface TVShowsGenreResponse {
  id: number;
  name: string;
}

export interface GetTVShowsGenresResponse {
  genres: TVShowsGenreResponse[]
}

export type GetTVShowsResponse = PaginatableCollection<TVShowResponse>;