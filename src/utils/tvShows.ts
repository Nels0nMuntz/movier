import { GetTVShowsResponse } from "api";
import { GenresCollection, Movie, TVShow, TVShowBase } from "types";

const normalizeTVShow = (tvShow: TVShowBase, geners: GenresCollection): TVShow => {
  return {
    ...tvShow,
    kind: "tv",
    genres: tvShow.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeTVShowsResponse = (tvShows: TVShowBase[], geners: GenresCollection): TVShow[] => {
  // eslint-disable-next-line no-debugger
  // debugger;
  return tvShows.map(tvShow => normalizeTVShow(tvShow, geners));
};

export const isLastTVShowPage = (moviesResponse: GetTVShowsResponse) => {
  return moviesResponse.page === moviesResponse.total_pages
};

export const isTvShow = (item: Movie | TVShow) => {
  return item.kind === "tv";
};
