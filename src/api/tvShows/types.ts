import { PaginatableCollection } from "types";
import { TVShowBase } from "types/TVShow";

export interface GetTVShowsRequest {
  page: number;
}

export interface GetTrendingTVShowsRequest extends GetTVShowsRequest {
  timeWindow: "day" | "week";
}

export interface GetOnTheAirTVShowsRequest extends GetTVShowsRequest {
  timezone?: string;
}

export interface TVShowsGenreResponse {
  id: number;
  name: string;
}

export interface GetTVShowsGenresResponse {
  genres: TVShowsGenreResponse[]
}

export type GetTVShowsResponse = PaginatableCollection<TVShowBase>;