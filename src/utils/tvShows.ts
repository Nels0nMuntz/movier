import { GetTVShowsResponse } from "api";
import { GenresCollection, TVShow, TVShowBase } from "types";

const normalizeTVShow = (tvShow: TVShowBase, geners: GenresCollection): TVShow => {
  return {
    ...tvShow,
    kind: "tvShow",
    genres: tvShow.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeTVShowsResponse = (tvShows: TVShowBase[], geners: GenresCollection): TVShow[] => {
  return tvShows.map(tvShow => normalizeTVShow(tvShow, geners));
};

export const isLastTVShowPage = (moviesResponse: GetTVShowsResponse) => {
  return moviesResponse.page === moviesResponse.total_pages
}