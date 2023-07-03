import { TVShowResponse } from "api";

export interface TVShow extends TVShowResponse {
  genres: string[];
}