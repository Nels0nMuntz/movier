import { Status, TVShow } from "types";

type CollectionKey = "airingToday" | "onTheAir" | "popular" | "topRated" | "trendingDaily" | "trendingWeekly";

export interface CollectionParams {
  status: Status;
  data: TVShow[];
  page: number;
  isLastPage: boolean;
}

export type TVShowsLists = Record<CollectionKey, CollectionParams>;