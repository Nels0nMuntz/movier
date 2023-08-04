import { PaginatableCollection } from "types";
import { TVShowBase, TVShowDetails } from "types/TVShow";


export interface TVShowResponse extends TVShowBase {
  genre_ids: number[];
}
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

export type GetTVShowsResponse = PaginatableCollection<TVShowResponse>;

export interface GetTVShowByIdRequest {
  series_id: number;
}

export type GetTVShowByIdResponse = TVShowDetails<TVShowResponse>;

export interface GetSimilarTVShowsRequest {
  series_id: number;
  page: number;
}

export type GetSimilarTVShowsResponse = PaginatableCollection<TVShowResponse>;

export type GetTVShowsPrivateListResponse = PaginatableCollection<TVShowResponse>;