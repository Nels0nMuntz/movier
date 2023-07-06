import { Movie, Status } from "types";

type CollectionKey = "trendingDaily" | "trendingWeekly" | "popular" | "topRated" | "upcoming";

export interface CollectionParams {
  status: Status;
  data: Movie[];
  page: number;
  isLastPage: boolean;
}

export type MoviesLists = Record<CollectionKey, CollectionParams>;