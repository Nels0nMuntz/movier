import { TVShowResponse } from "api";

export interface TVShow extends TVShowResponse {
  kind: "tvShow";
  genres: string[];
}