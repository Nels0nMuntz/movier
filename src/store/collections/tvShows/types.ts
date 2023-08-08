import { CollectionParams, TVShow } from "types";

type CollectionKey = "airingToday" | "onTheAir" | "popular" | "topRated" | "trendingDaily" | "trendingWeekly";


export type TVShowsLists = Record<CollectionKey, CollectionParams<TVShow[]>>;