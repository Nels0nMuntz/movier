import { MediaType } from "types/MediaType";

export interface GetAccountDetailsParams {
  sessionId: string;
}

export interface GetAccountDetailsResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface AddToWatchlistRequest {
  account_id: number;
  session_id: string;
  body: {
    media_type: MediaType;
    media_id: string;
    watchlist: true;
  }
}

export interface AddToFavoriteRequest {
  account_id: number;
  session_id: string;
  body: {
    media_type: MediaType;
    media_id: string;
    favorite: boolean;
  }
}