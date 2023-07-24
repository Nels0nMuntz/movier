import { Genre } from "./Genres";
import { PaginatableCollection } from "./PaginatableCollection";


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
  kind: "movie";
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

interface Credits {
  id: number;
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[],
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  }[],
}