import { Credits } from "./Credits";
import { Genre } from "./Genres";
import { PaginatableCollection } from "./PaginatableCollection";
import { Review } from "./Review";

export interface TVShowBase {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShow extends TVShowBase {
  kind: "series";
  genres: string[];
}

export interface TVShowDetails<S> extends TVShowBase {
  adult: boolean;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  };
  credits: Credits;
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
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
  reviews: PaginatableCollection<Review>
  similar: PaginatableCollection<S>
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}