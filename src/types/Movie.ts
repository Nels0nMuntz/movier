import { MovieResponse } from "api";

export interface Movie extends MovieResponse {
  genres: string[];
}