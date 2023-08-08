import { Movie } from "./Movie";
import { TVShow } from "./TVShow";

export interface MultiSearchResultData {
  movies: Movie[];
  tvShows: TVShow[]
}