import { MultiSearchResponse } from "api/search/types";
import { GenresCollection, MultiSearchResultData } from "types";
import { normalizeMovie } from "./movies";
import { MovieResponse, TVShowResponse } from "api";
import { normalizeTVShow } from "./tvShows";

export const normalizeSearchResponse = (response: MultiSearchResponse, movieGeners: GenresCollection, tvShowGenres: GenresCollection): MultiSearchResultData => {
  const movies = response.results
    .filter(({ media_type }) => media_type === "movie")
    .map((item) => normalizeMovie(item as MovieResponse, movieGeners));
  const tvShows = response.results
    .filter(({ media_type }) => media_type === "tv")
    .map((item) => normalizeTVShow(item as TVShowResponse, tvShowGenres));
  return {
    movies,
    tvShows,
  };
}