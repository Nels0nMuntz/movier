import { GetTVShowsResponse, TVShowResponse } from "api";
import { Genres, TVShow } from "types";

const normalizeTVShow = (tvShow: TVShowResponse, geners: Genres): TVShow => {
  return {
    ...tvShow,
    genres: tvShow.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeTVShowsResponse = (tvShows: TVShowResponse[], geners: Genres): TVShow[] => {
  return tvShows.map(tvShow => normalizeTVShow(tvShow, geners));
};

export const isLastTVShowPage = (moviesResponse: GetTVShowsResponse) => {
  return moviesResponse.page === moviesResponse.total_pages
}