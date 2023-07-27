import { configure } from "mobx";
import { AuthStore } from "./auth/auth";
import { BrowsePageStore } from "./browse/browse";
import { GenresStore } from "./genres/genres";
import { MoviesCollectionStore } from "./collections/movies/movies";
import { TVShowsCollectionStore } from "./collections/tvShows/tvShows";
import { MoviesPageStore } from "./movies/movies";
import { TvShowsPageStore } from "./tvShows/tvShows";
import { AccountStore } from "./account/account";

configure({
  enforceActions: "always",
})

export class RootStore {
  accountStore: AccountStore;
  authStore: AuthStore;
  moviesCollectionStore: MoviesCollectionStore;
  tvShowsCollectionStore: TVShowsCollectionStore;
  genresStore: GenresStore;
  browsePageStore: BrowsePageStore;
  moviesPageStore: MoviesPageStore;
  tvShowsPageStore: TvShowsPageStore;

  constructor() {
    this.accountStore = new AccountStore();
    this.authStore = new AuthStore(this);
    this.moviesCollectionStore = new MoviesCollectionStore(this);
    this.tvShowsCollectionStore = new TVShowsCollectionStore(this);
    this.genresStore = new GenresStore();
    this.browsePageStore = new BrowsePageStore(this);
    this.moviesPageStore = new MoviesPageStore(this);
    this.tvShowsPageStore = new TvShowsPageStore(this);
  }
};

export const rootStore = new RootStore();
