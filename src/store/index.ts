import { configure } from "mobx";
import { AuthStore } from "./auth/auth";
import { BrowseStore } from "./browse/browse";
import { GenresStore } from "./genres/genres";
import { MoviesStore } from "./movies/movies";
import { TVShowsStore } from "./tvShows/tvShows";

configure({
  enforceActions: "always",
})

export class RootStore {

  authStore: AuthStore;
  moviesStore: MoviesStore;
  tvShowsStore: TVShowsStore;
  genresStore: GenresStore;
  browseStore: BrowseStore;

  constructor() {
    this.authStore = new AuthStore();
    this.moviesStore = new MoviesStore(this);
    this.tvShowsStore = new TVShowsStore();
    this.genresStore = new GenresStore();
    this.browseStore = new BrowseStore(this);
  }
};

export const rootStore = new RootStore();