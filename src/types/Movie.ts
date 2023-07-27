import { Credits } from "./Credits";
import { Genre } from "./Genres";
import { MediaType } from "./MediaType";
import { PaginatableCollection } from "./PaginatableCollection";
import { Review } from "./Review";


export interface MovieBase {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends MovieBase {
  kind: MediaType;
  genres: string[];
}

export interface MovieDetails<S> extends MovieBase {
  belongs_to_collection: object | null;
  budget: number;
  credits: Credits;
  genres: Genre[]
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
  }[];
  production_countries: {
    iso_3166_1: string,
    name: string,
  }[];
  revenue: number;
  reviews: PaginatableCollection<Review>
  runtime: number;
  similar: PaginatableCollection<S>
  spoken_languages: {
    english_name: string,
    iso_639_1: string,
    name: string,
  }[];
  status: string;
  tagline: string;
}
