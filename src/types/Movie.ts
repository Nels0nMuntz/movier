import { MovieResponse } from "api";

export interface Movie extends MovieResponse {
  kind: "movie";
  genres: string[];
}