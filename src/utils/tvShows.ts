import { TVShowResponse } from "api";
import { GenresCollection, Movie, PaginatableCollection, TVShow, TVShowBase } from "types";

const normalizeTVShow = (tvShow: TVShowResponse, geners: GenresCollection): TVShow => {
  return {
    ...tvShow,
    kind: "tv",
    genres: tvShow.genre_ids.map(genre_id => geners[genre_id] as string),
  }
};

export const normalizeTVShowsResponse = (tvShows: TVShowResponse[], geners: GenresCollection): TVShow[] => {
  return tvShows.map(tvShow => normalizeTVShow(tvShow, geners));
};

export const isLastTVShowPage = (moviesResponse: PaginatableCollection<TVShowBase>) => {
  return moviesResponse.total_pages === 0 || moviesResponse.page === moviesResponse.total_pages
};

export const isTvShow = (item: Movie | TVShow) => {
  return item.kind === "tv";
};
