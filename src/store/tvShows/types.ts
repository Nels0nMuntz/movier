import { Status, TVShow } from "types";

type SectionKey = "trendingDaily" | "trendingWeekly";

export interface SectionParams {
  status: Status;
  data: TVShow[];
  page: number;
  isLastPage: boolean;
}

export type TVShowsLists = Record<SectionKey, SectionParams>;