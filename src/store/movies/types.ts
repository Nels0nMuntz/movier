import { Movie, Status } from "types";

export type SectionKey = "trendingDaily" | "trendingWeekly" | "popular" | "topRated" | "upcoming";

export interface SectionParams {
  status: Status;
  data: Movie[];
  page: number;
  isLastPage: boolean;
}