import { CollectionParams, Movie } from "types";

type CollectionKey = "trendingDaily" | "trendingWeekly" | "popular" | "topRated" | "upcoming";

export type MoviesLists = Record<CollectionKey, CollectionParams<Movie>>;